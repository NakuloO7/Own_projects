import { useState } from "react"

interface Props {
    onAdd : (text : string) => void;
}


export default function TodoInput ( {onAdd} : Props){
    const [text, setText] = useState("");

    const handleSubmit = (e : React.FormEvent)=>{
        e.preventDefault();
        if(!text.trim()) return;
        onAdd(text);
        setText("");
    }


    return (
        <form className="flex gap-2" onSubmit={handleSubmit}>
            <input type="text"
            value ={text}
            onChange={(e) =>setText(e.target.value)}
            className="flex-1 border rounded px-3 py-2 outline-none" 
            placeholder="Enter you todo..."/>

            <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
        </form>
    )
}