import { useEffect, useState } from "react"
import type { Todo } from "../types/todoType";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/todo";


export function TodoPage(){
     const [newTitle, setNewTitle] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);
    
    //fetch all the todos and display on page
    useEffect(()=>{
        const fetchTodos = async()=>{
            const data = await getTodos();
            setTodos(data);
        }

        fetchTodos();
    }, []);

    const handleUpdate = async(todo : Todo) =>{
        const updated = await updateTodo(todo.id, todo.completed);

        setTodos((prev)=>(
            prev.map((t)=>(t.id === todo.id ? updated : t))
        ))
    }

    const handleDelete = async(id : string) =>{
        await deleteTodo(id);
        setTodos((prev)=>prev.filter((t)=>t.id !== id))
    }

    const handleCreate = async()=>{
        if(!newTitle.trim()) return;
        const data = await createTodo(newTitle);
        setTodos((prev)=> [...prev, data]);
        setNewTitle("");
    }

    return (
        <div>
            <h2>Your Todos</h2>
            <div>
                <input type="text" placeholder="Title" value={newTitle} onChange={(e)=>{
                    setNewTitle(e.target.value);
                }} />
                <button onClick={handleCreate}>Add</button>
            </div>

            <br />
            <hr />

            {/* SHOW TODOS */}
            <ul>
                {todos.map((todo)=>(
                    <li key={todo.id}>{todo.title} - {todo.completed ? "Done" : "Pending"}
                    <button onClick={()=>handleUpdate(todo)}>Update</button>
                    <button onClick={()=>handleDelete(todo.id)}>Delete</button>
                    </li> 
                ))}
            </ul>
        </div>
    )
}