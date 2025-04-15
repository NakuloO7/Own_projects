import { TodoType } from "../App";

interface Props {
    todo : TodoType;
    onToggle: () => void;
    onDelete: () =>void;
}


export default function TodoItem ({todo, onToggle, onDelete} : Props){
   
    return (
        <div className="flex justify-between items-center bg-gray-50 border rounded p-2">
            <span onClick={onToggle}
            className={`cursor-pointer flex-1 ${todo.done ? "line-through text-gray-400" : ""}`}
            >{todo.text}</span>
            <button onClick={onDelete} 
            className="text-red-500 hover:text-red-700 font-bold ml-4">x</button>
        </div>

    )
}