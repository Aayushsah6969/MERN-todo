import express from 'express';
import { createTodo, deleteTodo, getTodo, updateTodo } from '../controller/todo.controller.js';
import { authenticate } from '../middleware/authorize.js';

const router = express.Router();

// Route for creating a todo
router.post('/create', authenticate, createTodo);
router.get('/fetch',authenticate, getTodo);
router.put('/update/:id', authenticate, updateTodo);
router.delete('/delete/:id', authenticate, deleteTodo);

export default router;
