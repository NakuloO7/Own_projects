import axios from 'axios';
import dotenv from 'dotenv';
import type { Todo } from '../types/todoTypes';
dotenv.config();
const BASE_URL = process.env.BASE_URL;

export const getToken = ()=>{
    const token = localStorage.getItem('token'); //this will be required for all the routes
    if(!token){
        throw new Error("No token found")
    }
    return token;
}


//create
export const createTodo = async(title : string) : Promise<Todo> =>{
    const response = await axios.post<{todo : Todo}>(`${BASE_URL}/api/todo/`, {title}, {
        headers :  {
            Authorization : getToken()
        }
    })

    return response.data.todo;
}

//read
export const getAllTodos = async() : Promise<Todo[]> =>{
    const response = await axios.get<{todos : Todo[]}>(`${BASE_URL}/api/todo`, {
        headers : {
            Authorization : getToken()
        }
    })
    return response.data.todos;
}

//update 
export const updateTodo = async(id: string, title : string, completed : boolean) : Promise<Todo> =>{
    const response = await axios.put<{todo : Todo}>(`${BASE_URL}/api/todo/${id}`, {title, completed}, {
        headers: {
            Authorization : getToken()
        }
    })

    return response.data.todo;
}

export const deleteTodo = async(id: string) : Promise<void> =>{
    await axios.delete(`${BASE_URL}/api/todo/${id}`, {
        headers : {
            Authorization : getToken()
        }
    })
}

