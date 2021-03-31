import { Router } from 'express';
import { createTodo, getAllTodo, updateTodo, deleteTodo } from '../controllers/todo';

const router = Router();
router.post('/', createTodo);
router.get('/', getAllTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
