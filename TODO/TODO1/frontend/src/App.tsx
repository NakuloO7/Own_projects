import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Todo from './pages/Todo'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Navigate to="/signup"/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/todo' element={<ProtectedRoute><Todo/></ProtectedRoute>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
