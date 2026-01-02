import { signin } from "../api/auth";
import AuthForm from "./AuthForm";


export default function Signup(){

    const handleSignup = async(email : string, password :string)=>{
       try {
        await signin(email, password);
        alert("Signup Successfull")
       } catch (error) {
        console.log("Erorr in Signup!")
       }
    }


    return (
        <AuthForm title="Signup" onSubmit={handleSignup}/>
    )
}