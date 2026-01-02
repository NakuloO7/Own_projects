import { useState } from 'react'
import { TodoPage } from './pages/Todopage';
import Signup from './components/Signup';
import Signin from './components/Signin';


function App() {
  const [isAuthenticated, setIsAuthernticated] = useState(Boolean(localStorage.getItem('token')));

  function logout(){
    localStorage.removeItem('token')
    setIsAuthernticated(false);
  }

  return ( 
    <div>
      {isAuthenticated ? (
        <>
        <TodoPage/>
        <button onClick={logout}>Logout</button>
        </>
      ): (
        <>
        <Signup />
        <hr />
        <Signin onLoginSuccess={()=>setIsAuthernticated(true)}/>
        </>
      )}
    </div>
    )
}

export default App
