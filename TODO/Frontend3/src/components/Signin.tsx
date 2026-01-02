import { signin } from "../api/auth";
import AuthForm from "./Authform";


export default function Signin () {

    const handleSignin = async(email : string, password : string) =>{
       try {
          const data = await signin(email, password);
          localStorage.setItem("token", data.token)
       } catch (error) {
        console.log("Error in Signin", error);
        alert("Enable to Signin!")
       }
    }

    return (
        <AuthForm title="Signin" onSubmit={handleSignin}/>
    )
}