import { signinApi } from "../api/auth";
import AuthForm from "./AuthForm";

interface SigninProps {
    onLoginSuccess : () => void 
}


export default function Signin({onLoginSuccess} : SigninProps){

    const handleSubmit = async(email : string, password : string) : Promise<void>=>{
      try {
        const data = await signinApi(email, password);
        //store token
        localStorage.setItem("token", `Bearer ${data.token}`);
        onLoginSuccess();

        alert("Sigin successfull!")
      } catch (error) {
        alert("Signin Failed!");
        console.error(error);
      }
    }
    return (
        <AuthForm
        title="Signin"
        buttonText="Signin"
        onSubmit={handleSubmit}/>
    )

}