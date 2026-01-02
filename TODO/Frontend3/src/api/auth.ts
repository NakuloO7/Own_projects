import axios from "axios";
import dotenv from 'dotenv';
import type { AuthResponse } from "../types/authType";
dotenv.config();

const BASE_URL = process.env.BASE_URL;

interface SingupResponse {
    message : string;
}

//Signup
export const signup = async(email : string, password : string) : Promise<SingupResponse>=>{
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, {email, password});
    return response.data.message;
}

//Signin
export const signin = async(email : string, password : string) : Promise<AuthResponse>=>{
    const response = await axios.post(`${BASE_URL}/api/auth/signin`, {email, password});
    return response.data.token;
}