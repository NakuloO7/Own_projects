import { useState } from 'react'
import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(Boolean(localStorage.getItem('token')));
  //if this is true then you will be logged in

  function handleLogout(){
    localStorage.removeItem('token');
    setisAuthenticated(false);
  }

  return (
      <div>
        {isAuthenticated ? (
          <>
          <h2>You are logged in!</h2>
          <button onClick={handleLogout}>Logout</button>
          </>
        ) :(
          <>
        <Signup/>
        <hr />
        <Signin onLoginSuccess={() => setisAuthenticated(true)}/>
        </>
        )}
      </div>
  )
}

export default App
