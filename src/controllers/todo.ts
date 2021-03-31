import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODO_LIST: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const randomId = (Math.random() * 10000).toFixed(0);
  const text = (req.body as {text: string}).text;
  const newTodo = new Todo(randomId, text);

  TODO_LIST.push(newTodo);

  res.status(201).json({message: "Created todo!", createdTodo: newTodo});
}

export const getAllTodo: RequestHandler = (req, res, next) => {
  res.json(TODO_LIST);
}

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id;
  const newTodoText = (req.body as { text: string }).text;
  const todoIndex = TODO_LIST.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) throw new Error(`Could not find todo with id ${todoId}`);

  TODO_LIST[todoIndex] = new Todo(TODO_LIST[todoIndex].id, newTodoText);

  res.json({ message: `Todo updated!`, updateTodo: TODO_LIST[todoIndex] });
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODO_LIST.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) throw new Error(`Could not find todo with id ${todoId}`);

  const deletedTodo = TODO_LIST[todoIndex];
  TODO_LIST.splice(todoIndex, 1);

  res.json({message: 'Todo deleted!', deleteTodo: deletedTodo});
}