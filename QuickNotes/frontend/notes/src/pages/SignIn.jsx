import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonWarning from "../components/ButtonWarning";


const Signin = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleOnClick = async() =>{
        //this post request will give back a jwt token which we will store in localstorage for the further use
        const response = await axios.post("http://localhost:3001/api/v1/user/signin", {
          emailId : email,
          password: password
        });
    
        localStorage.setItem("token", response.data.token);
        console.log(response.data.token)
        //we will try to add the logout functionality here
        navigate('/dashboard')
    
      }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center text-gray-800">Access Your Notes</h2>
              <p className="text-center text-gray-600 mt-2">Enter your details to get started</p>
            </div>
    
            <form className="space-y-6">
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) =>{ setEmail(e.target.value) }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                  placeholder="Enter your email"
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) =>{ setPassword(e.target.value) }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                  placeholder="Create a password"
                />
              </div>
    
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium transition-colors"
                onClick={handleOnClick}
              >
                Sign In
              </button>
            </form>
            {/*This is the seperate component made*/}
            <ButtonWarning
            label={"Don't have a account?"} 
            buttonText={"Sign up"}
            to={"/signup"}/>
          </div>
        </div>
      );

}

export default Signin;