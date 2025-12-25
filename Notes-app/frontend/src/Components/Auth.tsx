import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { signUpInputs } from "@nakul_123/inkspire-common";
import { BackendUrl } from "../config";

// npx shadcn@latest add "https://v0.dev/chat/b/b_JwQPtRk1bf2?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..e6QKpv-vDitqsCcy.dvOvT8doHvE0Asq0-oWudR-UwrePCnP1g9XfFZh4cj54TS5gNkq-Ok88YEs.hksSh0a-s6h3-djokaQKxQ"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {

  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signUpInputs>({
    name: "",
    email: "",
    password: "",
  });


  //backend call
  const sendRequest = async () => {
    try {
        const response = await axios.post(`${BackendUrl}/api/v1/user/${type === 'signup'? 'signup' : 'signin'}`, postInputs);

        //from the backend we will get the jwt token as response
        const token = response.data.token;

        localStorage.setItem("token", `Bearer ${token}`);
        navigate('/blogs')

    } catch (error) {
       alert("Alert! There is an error while sending this request" );
       console.log(error)
    }
  };

  const isSignin = type === "signin"; //to swtich between sign in and signup page

  return (
    <div className="flex items-center justify-center h-full bg-white">
      <div className="w-full max-w-md space-y-8 px-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Create an account
          </h1>

          <p className="text-gray-600">
            {isSignin ? "Don't have an Account?" : "Already have an Account?"}
            <Link
              to={isSignin ? "/signin" : "/signup"}
              className="font-medium text-blue-600 hover:text-blue-500 underline underline-offset-4 pl-1"
            >
              {isSignin ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </div>

        <form className="space-y-6" 
        onSubmit={async(e)=>{
          e.preventDefault();  //prevents the page reload 
          await sendRequest();  //calls you function
        }}>
          {type === "signup" ? (
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            {type === "signup" ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="underline hover:text-gray-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-gray-700">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
