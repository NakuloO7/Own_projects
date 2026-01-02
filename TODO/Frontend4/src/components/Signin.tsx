import { signin } from "../api/auth";
import AuthForm from "./AuthForm";

interface SigninProps{
    onLoginSuccess : ()=>void
}

export default function Signin({onLoginSuccess} : SigninProps){

    const handleSignin = async(email : string, password : string)=>{
        try {
            const data = await signin(email, password);
            localStorage.setItem('token', data.token);
            onLoginSuccess();
            alert("Signin successfull!");
        } catch (error) {
            console.log("Error in Signin")
        }
    }


    return(
        <AuthForm title="Signin" onSubmit={handleSignin} />
    )
}