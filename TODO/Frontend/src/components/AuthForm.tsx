import { useState } from "react";

interface AuthFormProps {
    title : string;
    buttonText : string;
    onSubmit : (email : string, password : string) => Promise<void>
}

export default function AuthForm({title, buttonText, onSubmit} : AuthFormProps){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(){
        if (!email || !password) {
          alert("Email and password are required");
          return;
        }
        onSubmit(email, password)
    }

    return (
        <div>
            <h2>{title}</h2>
            <input type="text" value={email} placeholder="Email" onChange={(e)=>{
                setEmail(e.target.value)
            }} />

            <input type="password" value={password} placeholder="Password" onChange={(e)=>{
                setPassword(e.target.value)
            }} />

            <button onClick={handleSubmit}>{buttonText}</button>
        </div>
    )
}