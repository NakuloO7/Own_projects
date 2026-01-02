import axios from 'axios';
import dotenv from 'dotenv';
import type { AuthResponse, SignupResponse } from '../types/authTypes';
dotenv.config();

const BASE_URL = process.env.BASE_URL;


//sign up 
export const signup = async(email : string, password : string) : Promise<SignupResponse>=>{
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, {email, password});
    return response.data.message;
}

//sign in
export const signin = async(email : string, password :string) : Promise<AuthResponse> =>{
    const response = await axios.post(`${BASE_URL}/api/auth/signin`, {email, password});
    return response.data.token;
}