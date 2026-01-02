import { signup } from "../api/auth";
import AuthForm from "./Authform"


export default function Signup() {
    
    const handleSignup = async(email : string, password : string) =>{
        try {
            await signup(email, password);
            alert("Signup successful!")
        } catch (error) {
            console.log("Error in Signup!", error);
            alert("Enable to Signup!")
        }
    }

    return(
        <AuthForm  title="Signup" onSubmit={handleSignup}/>
    )
}