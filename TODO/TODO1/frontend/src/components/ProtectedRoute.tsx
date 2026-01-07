import { useEffect, useState, type JSX } from "react";
import { api } from "../api/axios";
import { Navigate } from "react-router-dom";



export default function ProtectedRoute({children} : {children : JSX.Element}){
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        api.get('/api/v1/todo/')
        .then(()=>setAuthorized(true))
        .catch(()=>setAuthorized(false))
        .finally(()=>setLoading(false))
    })

    if(loading) return <div>Loading...</div>
    if(!authorized) return <Navigate to={'/signin'}/>
    return children;
}