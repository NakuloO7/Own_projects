import { signup } from "../api/auth";
import AuthForm from "./AuthForm";


export default function Signup(){
    
    const handleSignup = async(email : string, password : string)=>{
        try {
            await signup(email, password);
            alert("Signup successful. Please sign in.");
        } catch (error) {
            console.log("Error in Signup!", error)
            alert("Signup Failed!");
        }
    }

    return (
        <AuthForm title="Signup" onSubmit={handleSignup} />
    )
}