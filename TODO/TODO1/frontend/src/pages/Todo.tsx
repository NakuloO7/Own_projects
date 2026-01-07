import { useEffect, useState } from "react"
import { api } from "../api/axios";

interface Todo{
    id : string;
    title : string;
    completed : boolean
}


export default function Todo(){
    const [title, setTitle]= useState("");
    const [todos, setTodos] = useState<Todo[]>([]);

    //first fetch all the todos and set in setTodos
    const fetchTodos = async()=>{
        const res = await api.get('/api/v1/todo/');
        setTodos(res.data.todos);
    }
    const createTodo = async()=>{
        await api.post('/api/v1/todo/', {title});
        setTitle("");  //for new todo
        fetchTodos();
    }

    const toggleTodo = async(todo : Todo) =>{
        await api.put(`/api/v1/todo/${todo.id}`, {completed : !todo.completed});
        fetchTodos();
    }

    const removeTodo = async(id : string)=>{
        await api.delete(`/api/v1/todo/${id}`);
        fetchTodos();
    }

    useEffect(()=>{
        fetchTodos();
    },[])

    return (
        <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border flex-1 p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-black text-white px-4" onClick={createTodo}>
          Add
        </button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id} className="flex justify-between border p-2 mb-2">
          <span
            className={todo.completed ? "line-through" : ""}
            onClick={() => toggleTodo(todo)}
          >
            {todo.title}
          </span>
          <button onClick={() => removeTodo(todo.id)}>❌</button>
        </div>
      ))}
    </div>
    )
}