import { useState } from "react";


function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");

    const handleSubmit = ()=>{
        console.log("Email", email);
        console.log("Password", password);
    }


    return (
        <div>
            <h2>Sign Up</h2>

            <input onChange={(e)=>{
                setEmail(e.target.value)
            }} value={email} placeholder="Email" id="" />
            
            <input type="password" value={password} onChange={(e)=>{
                setPassword(e.target.value)
            }} />

            <button onClick={handleSubmit}>SignUp</button>
        </div>
    )

}

export default Signup;