import { useState } from 'react';
import './App.css'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'

export interface TodoType{
  id : number;
  text : string;
  done : boolean;
}

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);


  //function to add new todos to the hook
  const addTodo = (text : string)=>{
    setTodos([...todos, {id : Date.now(), text, done : false}])
  }

  const toggleTodo = (id : number)=>{
    setTodos(todos.map(todo =>
      todo.id === id ? {...todo, done : !todo.done} : todo
    ));
  }

  const deleteTodo = (id : number)=>{
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
    <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">📝 Todo App</h1>
      <TodoInput onAdd={addTodo} />
      <div className="mt-6 space-y-3">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">No todos yet...</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))
        )}
      </div>
    </div>
  </div>
  )
}

export default App
