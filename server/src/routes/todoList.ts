import express, { Router } from 'express'
const router = express.Router()
import { getTodoListController, getTodoItemController } from '../controller/todoList/getTodoContoller';
import { createTodoController } from '../controller/todoList/createTodoContoller';
import { updateTodoController } from '../controller/todoList/updateTodoContoller';
import { deletetodoItemController } from '../controller/todoList/deleteTodoController';

export async function todoRoutes() {
    router.get('/todos', getTodoListController);
    router.get('/todo/:id', getTodoItemController);
    router.post('/createtodo', createTodoController);
    router.put('/todo/:id', updateTodoController);
    router.delete('/todo/:id', deletetodoItemController);

}

