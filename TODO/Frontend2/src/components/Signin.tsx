import { signin } from "../api/auth";
import AuthForm from "./AuthForm";


interface SigninPrpos{
    onLoginSuccess : ()=>void;
}

export default function Signin({onLoginSuccess} : SigninPrpos){

    const handleSignin = async(email : string, password : string) =>{
        try {
            const data = await signin(email, password);
            localStorage.setItem("token", `Bearer ${data.token}`);
            onLoginSuccess();  //this will define the ui render
        } catch (error) {
            console.log("Error in signin", error);
            alert("Signin Failed!");
        }
    }

    return(
        <AuthForm title= "Signin" onSubmit={handleSignin}/>
    )
}