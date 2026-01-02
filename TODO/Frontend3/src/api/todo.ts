import axios from "axios";
import dotenv from 'dotenv';
import type { Todo } from "../types/todoType";
dotenv.config();

const BASE_URL = process.env.BASE_URL;

const getToken = ()=>{
    const token = localStorage.getItem('token');
    if(!token) throw  new Error("Unauthorised user!");
    return `Bearer ${token}`
}

//create
const createTodo = async(title : string) : Promise<Todo> =>{
    const response = await axios.post<{todo : Todo}>(`${BASE_URL}/api/todo/`, {title}, {
        headers : {
            Authorization : getToken()
        }
    })

    return response.data.todo;
}

//read

const getTodos = async() : Promise<Todo[]> =>{
    const response = await axios.get<{todos: Todo[]}>(`${BASE_URL}/api/todo/`, {
        headers : {
            Authorization : getToken()
        }
    })

    return response.data.todos;
}

//update

const updateTodo = async(id : string, completed : string) : Promise<Todo> =>{
    const response = await axios.put<{todo: Todo}>(`${BASE_URL}/api/todo/${id}`, {completed}, {
        headers : {
            Authorization : getToken()
        }
    })

    return response.data.todo;
}

//delete

const deleteTodo = async(id : string) : Promise<void> =>{
    await axios.delete(`${BASE_URL}/api/todo/${id}`, {
        headers : {
            Authorization : getToken()
        }
    })
}