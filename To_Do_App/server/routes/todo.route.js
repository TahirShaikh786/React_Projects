import express from "express";
import * as todoController from "../controllers/todo.controller.js";

const router = express.Router();

router.get('/todos', todoController.getTodos);
router.post('/todos', todoController.insertTodo);
router.put('/todos', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

export default router;