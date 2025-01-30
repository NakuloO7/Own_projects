import React from "react";
import Logo from "./shared/Logo";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";

const Navbar = () => {
  const user = true;
  const navigate = useNavigate();

  const logoutHandler = async()=>{
    try{
        //network call
        const res = await axios.get("http://localhost:3000/api/v1/user/logout");
        if(res.data.success){
            navigate('/login');
            toast.success(res.data.message);
        }
    }catch(error){
        toast.error(error.res.data.message);
    }
  }

  return (
    <div className="border-b border-gray-300">
       <div  className="flex items-center justify-between max-w-7xl mx-auto h-16">
        <Logo />
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                {/*<AvatarFallback>CN</AvatarFallback>*/}
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
                <Button variant = "link" onClick = {logoutHandler}>Logout</Button>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Signup</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
