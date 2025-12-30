import { signupApi } from "../api/auth";
import AuthForm from "./AuthForm";

export default function Signin(){


    const handleSubmit = async(email : string, password : string)=>{
        try {
            await signupApi(email, password);
            alert("Signup successfull!")
        } catch (error) {
            alert("Signup failed!");
            console.error(error)
        }
    }
       
    return (
        <AuthForm
        title="Signup"
        buttonText="Signup"
        onSubmit={handleSubmit}/>
    )

}