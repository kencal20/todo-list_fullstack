const express = require('express');
const router = express.Router()
const { getTodoListController, getTodoItemController } = require('../controller/todoList/getTodoContoller');
const  createTodoController  = require('../controller/todoList/createTodoContoller');
const  updateUserController  = require('../controller/todoList/updateTodoContoller');
const  deletetodoItemController  = require('../controller/todoList/deleteTodoController');


router.get('/todos', getTodoListController);
router.get('/todo/:id', getTodoItemController);
router.post('/createtodo', createTodoController);
router.put('/todo/:id', updateUserController);
router.delete('/todo/:id', deletetodoItemController);


module.exports = router;