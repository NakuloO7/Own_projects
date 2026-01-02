import axios from "axios";
import dotenv from 'dotenv';
import type { Todo } from "../types/todoType";
dotenv.config();

const BASE_URL = process.env.BASE_URL;



//create
const createTodo = async(title : string) : Promise<Todo> =>{
    
}

//read

//update

//delete