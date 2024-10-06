import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import PageNotFound from "./components/PageNotFound"


function App() {
 const token =  localStorage.getItem('jwt');


  return (
     <>
      <Routes>
        <Route path="/" element={token?<Home />: <Navigate to={"/login"}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

     </>
  )
}

export default App
