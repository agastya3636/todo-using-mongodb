import { asyncHandeller } from "../utils/asyncHandeller.js";
import { Todo } from '../models/todo.model.js';
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const createTodo = asyncHandeller(async (req, res) => {
    const { title, description, status, dueDate ,priority} = req.body;
    const user = req.user;
    
    const todo = new Todo({
        title,
        description,
        status,
        dueDate,
        priority
    });
    
    await todo.save();
    user.todo_list.push(todo);
    await user.save();
    
    res.status(201).json({
        message: "Todo created successfully",
        todo,
    });
});

const getTodos = asyncHandeller(async (req, res) => {
    const user = req.user;
    
    await user.populate("todo_list");
    
    res.status(200).json({
        todo_list: user.todo_list,
    });
});

const getTodo = asyncHandeller(async (req, res) => {
    const  id  = req.query.id;
    console.log(id);
    const user = req.user;
    const todo = await Todo.findById(id);
    
    if (!todo) {
        return res.status(404).json({
            message: "Todo not found",
        });
    }
    
    if (!user.todo_list.includes(todo._id)) {
        return res.status(403).json({
            message: "You are not authorized to view this todo",
        });
    }
    
    res.status(200).json({
        todo,
    });
});

const updateTodo = asyncHandeller(async (req, res) => {
    const  _id = req.query.id;
    console.log(req.query.id);
    const user = req.user;
    const todo = await Todo.findById(_id);
    console.log(user.todo_list.includes(todo._id));
    if (!todo) {
        return res.status(404).json({
            message: "Todo not found",
        });
    }
    
    if (!user.todo_list.includes(todo._id)) {
        return res.status(403).json({
            message: "You are not authorized to update this todo",
        });
    }
    const { title, description, status, dueDate } = req.body;
    todo.title = title;
    todo.description = description;
    todo.status = status;
    todo.dueDate = dueDate;
    await todo.save();
    
    res.status(200).json({
        message: "Todo updated successfully",
        todo,
    });
});


const deleteTodo = asyncHandeller(async (req, res) => {
    const  id  = req.query.id; 
    const user = req.user;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID format",
        });
    }
    const todo = await Todo.findById(id);
    if (!todo) {
        return res.status(404).json({
            message: "Todo not found",
        });
    }
    const userTodoList = user.todo_list.map(todoId => todoId.toString());
    if (!userTodoList.includes(todo._id.toString())) {
        return res.status(403).json({
            message: "You are not authorized to delete this todo",
        });
    }
    await Todo.findByIdAndDelete(id);
    user.todo_list = user.todo_list.filter(todoId => todoId.toString() !== id.toString());
    await user.save();
    res.status(200).json({
        message: "Todo deleted successfully",
    });
});


export { createTodo, getTodos, getTodo, updateTodo, deleteTodo };
