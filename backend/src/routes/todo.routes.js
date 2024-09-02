import * as todocontrollers from '../controller/todo.controller.js'
import express from 'express'
import { authenticateJWT } from '../middlewares/authenticateJWT.js';

const router = express.Router();

router.post("/",authenticateJWT, todocontrollers.createTodo);
router.get("/", authenticateJWT,todocontrollers.getTodos);

router.put("/", authenticateJWT,todocontrollers.updateTodo);
router.delete("/",authenticateJWT, todocontrollers.deleteTodo);


export default router;
