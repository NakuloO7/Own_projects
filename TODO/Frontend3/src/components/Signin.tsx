import { signin } from "../api/auth";
import AuthForm from "./Authform";


interface SigninPrpos{
    onLoginSuccess : ()=>void;
}


export default function Signin ({onLoginSuccess} : SigninPrpos) {

    const handleSignin = async(email : string, password : string) =>{
       try {
          const data = await signin(email, password);
          localStorage.setItem("token", data.token);
          onLoginSuccess();
       } catch (error) {
        console.log("Error in Signin", error);
        alert("Enable to Signin!")
       }
    }

    return (
        <AuthForm title="Signin" onSubmit={handleSignin}/>
    )
}


