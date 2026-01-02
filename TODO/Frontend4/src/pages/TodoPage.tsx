import { useEffect, useState } from "react"
import { createTodo, deleteTodo, getAllTodoa, updateTodo } from "../api/todo";
import type { Todo } from "../types/todoTypes";


export default function TodoPage(){
    const [todos, setTodos]= useState<Todo[]>([]);
    const [newTitle, setNewTitle] = useState("");

    useEffect(()=>{
        const fetchTodos = async()=>{
            const data = await getAllTodoa();
            setTodos(data);
        }
        fetchTodos();
    },[]);


    const handleUpdate = async(todo : Todo)=>{ 
        //find the todo with the id and replace with the updated response
        const updated = await updateTodo(todo.id, todo.completed);
        setTodos((prev)=>(
            prev.map((t)=>t.id === todo.id ? updated : t)
        ))
    };

    const handleDelete = async(id : string)=>{
        await deleteTodo(id);
        setTodos((prev)=>(
            prev.filter((t)=> t.id !== id)
        ))
    }

    const handleCreate = async() =>{
        if(!newTitle.trim()) return;
        const todo = await createTodo(newTitle);
        setTodos((prev)=>[...prev, todo])
        setNewTitle("");
    }

    return (
        <div>
            <h2>Your Todos</h2>
            {/*CREATE TODO */}
            <input type="text" placeholder="Title" value={newTitle} onChange={(e)=>{
                setNewTitle(e.target.value);
            }}/>
            <button onClick={handleCreate}>ADD TODO</button>
            <br />
            <hr />
            <br />
            {/*SHOW TODOS*/}
            {todos.map((todo)=>(
                <li key={todo.id}>{todo.title} - {todo.completed ? "Done" : "Pending"}
                <button onClick={()=>handleUpdate(todo)}>Update</button>
                <button onClick={()=>handleDelete(todo.id)}>Delete</button>
                </li>
            ))}
        </div>
    )
}