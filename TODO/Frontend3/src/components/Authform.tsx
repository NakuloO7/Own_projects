import { useState } from "react";

interface AuthFormProps{
    title : string,
    onSubmit : (email : string, password : string) => void;
}

export default function AuthForm({title, onSubmit}: AuthFormProps){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e : React.FormEvent)=>{
        e.preventDefault();
        onSubmit(email, password);
    }

    return(
        <form onSubmit={handleSubmit}>
        <input type="text" value={email} placeholder="Email" onChange={(e)=>{
            setEmail(e.target.value);
        }} />
        <input type="password" value={password} placeholder="Password" onChange={(e)=>{
            setPassword(e.target.value);
        }} />

        <button type="submit">{title}</button>
        </form>
    )
}