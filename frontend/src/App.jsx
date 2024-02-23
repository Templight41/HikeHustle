import './App.css'
import Login from './components/sign-in/Login'
import SignUp from './components/sign-up/SignUp'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import { useJwt } from "react-jwt";
import Logout from './components/logout/Logout';
import Home from './components/home/Home';
import { useEffect, useState } from 'react';
import Refresh from './components/refresh/Refresh';
import MyTasks from './components/myTasks/MyTasks';



function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [todo, setTodo] = useState({
    task: "",
    completed: false,
    completeBy: "",
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  } 
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}/>}/>
        <Route path="/tasks" element={<MyTasks  toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/refresh' element={<Refresh />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
