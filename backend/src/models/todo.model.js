import mongoose from "mongoose";



const todoItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    },
    dueDate: Date,
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Medium"
    }
});

export const Todo = mongoose.model("Todo", todoItemSchema);
