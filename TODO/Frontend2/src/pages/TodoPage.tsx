import { useEffect, useState } from "react"
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../api/todo";
import type { Todo } from "../types/todoTypes";



export default function TodoPage(){
    const [newTitle, setNewTitle] = useState("");
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(()=>{
        const fetchTodos = async()=>{
            const data = await getAllTodos();
            setTodos(data);
        }
        fetchTodos();
    },[])

    const handleCreate = async()=>{
        if(!newTitle.trim()) return;
        const todo = await createTodo(newTitle);
        setTodos((prev) => [...prev, todo]);
        setNewTitle("");
    }

    const handleDelete = async(id : string)=>{
        await deleteTodo(id);
        setTodos((prev)=> prev.filter((t)=>t.id !== id))
    }

    const handleUpdate = async(todo : Todo)=>{
        const updated = await updateTodo(todo.id, todo.title, !todo.completed);  //we just change if the todo is completed or not
        setTodos((prev) =>
            prev.map((t)=> (t.id === todo.id ? updated: t))
        )
    }

    return(
        <div>
            <h2>Your Todos</h2>
            {/* ADD TODO */}
            <input type="text" value={newTitle} onChange={(e)=>{
                setNewTitle(e.target.value)
            }} />
            <br />
            <button onClick={handleCreate}>Create</button>

            <hr />
            <hr />
            {/* SHOW TODOS*/}
            <ul>
                {todos.map((todo)=>(
                    <li key={todo.id}>{todo.title} - {todo.completed ? "Done": "Pending"}
                    <button onClick={() =>handleUpdate(todo)}>Complete</button>
                    <button onClick={() =>handleDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}