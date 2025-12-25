import { BackendUrl } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";


export interface Blog{
    title : string,
    content : string,
    id : string,
    author : {
        name : string
    }
}


//custom hook to get all the blogs
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get(`${BackendUrl}/api/v1/blog/`,
        {
            headers : {
                Authorization : localStorage.getItem('token')
            },
        }
    ).then((response) => {
      setBlogs(response.data.post), setLoading(false);
    });
  }, []);


  return {
    loading, 
    blogs
  }
};



//for a single blog
export const useBlog = ({id} : {id : string})=>{

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(()=>{
        axios.get(`${BackendUrl}/api/v1/blog/${id}`, {
            headers :{
                Authorization : localStorage.getItem('token')
            },
        }).then((response) =>{
            setBlog(response.data.post)
            setLoading(false)
        })
    }, [id]);


    return {
        loading,
        blog
    }
}
