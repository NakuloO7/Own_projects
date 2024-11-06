
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Paste } from './components/Paste'
import { ViewPaste } from './components/ViewPaste'
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<div> <Navbar/> <Home/></div>}/>
      <Route path='/pastes' element= {<div><Navbar/><Paste/></div>}/>
      <Route path='/pastes/:id' element= {<div><Navbar/> <ViewPaste/></div>}/>
    </Routes>
    </BrowserRouter>
  )


}

export default App
