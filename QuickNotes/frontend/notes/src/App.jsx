import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Signin from "./pages/SignIn";
import DashBoard from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element= {<DashBoard/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
