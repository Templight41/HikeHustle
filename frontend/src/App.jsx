import './App.css'
import Login from './components/sign-in/Login'
import SignUp from './components/sign-up/SignUp'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useJwt } from "react-jwt";

const token = JSON.parse(localStorage.getItem("token")).Token


function App() {
  const { decodedToken, isExpired } = useJwt(token);
  console.log(decodedToken)
  console.log(isExpired)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
