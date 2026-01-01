import axios from 'axios';
import dotenv from 'dotenv'
import type { AuthResponse } from '../types/authTypes';
dotenv.config();

const BASE_URL = process.env.BASE_URL;

export const signup = async(email :string, password : string): Promise<AuthResponse> =>{
        const response = await axios.post(`${BASE_URL}/api/signup`, {email, password});
        return response.data;
}

export const signin = async(email : string, password : string) : Promise<AuthResponse> =>{
    const response = await axios.post(`${BASE_URL}/api/sigin`, {email, password});
    return response.data.token;
}