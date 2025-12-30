import axios from "axios";
const API_URL = "http://localhost:3000";

export async function signupApi(email :string, password :string) {

    const response = await axios.post(`${API_URL}/api/auth/signup`, {
        email,
        password
    })
    return response.data;
}

export async function signinApi(email : string, password : string) {
    const response = await axios.post(`${API_URL}/api/auth/signin`, {
        email, 
        password
    })

    return response.data;  //jwt token
}