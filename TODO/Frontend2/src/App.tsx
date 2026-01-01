import { useState } from "react"
import TodoPage from "./pages/TodoPage";
import Signup from "./components/Signup";
import Signin from "./components/Signin";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('token')));

  function logout(){
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  return (
    <div>
      {isAuthenticated ? (
        <>
        <TodoPage/>
        <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
        <Signup />
        <hr />
        <Signin onLoginSuccess={()=>setIsAuthenticated(true)}/>
        </>
      )}
    </div>
  )
}

export default App
