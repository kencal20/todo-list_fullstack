import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './homeScreen';
import CreateTodo from './createTodo';
import Dashboard from './todoDashboard';
import UpdateTodoItem from './updatetodoItem';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { componentProps } from './objects.models';

export default function RouterComponent() {
    const [todos, setTodos] = useState<componentProps['formProps'][]>([]);

    async function fetchTodos() {
        try {
            const response = await axios.get('http://localhost:3000/todolist/todos');
            setTodos(response.data.todoList);
        } catch (error) {
            console.error('Error fetching to-do items:', error);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<HomeScreen todos={todos} setTodos={setTodos} fetchTodos={fetchTodos} />}
                />
                <Route
                    path='/createtodo'
                    element={<CreateTodo todos={todos} setTodos={setTodos} />}
                />
                <Route
                    path='/dashboard'
                    element={<Dashboard todos={todos} fetchTodos={fetchTodos} />}
                />
                <Route
                    path='/edittodo/:id' 
                    element={<UpdateTodoItem todos={todos} setTodos={setTodos} />}
                />
            </Routes>
        </BrowserRouter>
    );
}
