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
import { v4 as uuidv4 } from "uuid"



function App() {
  const [updateComplete, setUpdateComplete] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState("")
  const [allTodos, setAllTodos] = useState([])
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])

  const [petStatus, setPetStatus] = useState("/src/assets/standing.gif")

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setUserData(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const email = token.email
        const username = token.username
        const level = 1
    
        return {username: username, email: email, level}
      })

    }
  }, [])

  useEffect(() => {
    const allTodosCopy = [...allTodos]
    setTodos(() => allTodosCopy.filter((todo) => todo.completed !== true))
    setCompletedTodos(() => allTodosCopy.filter((todo) => todo.completed === true))
  }, [allTodos])


  const addTodo = (todoInfo) => {
    setAllTodos((todo) => {
      return [...todo, {id: uuidv4(), task: todoInfo.task, completed: false, completeBy: "todoInfo.completeBy"}]
    })
  }

  const deleteTodo = (todoId) => {
    setAllTodos(allTodos.filter((todo) => todo.id != todoId ))
  }


  useEffect(() => {
    const timer = setTimeout(() => {
        setPetStatus((status) => {
            return "/src/assets/standing.gif"
        })
    }, 2500);
    return () => clearTimeout(timer);
  }, [petStatus]);

  //Todo Complete
  const completeTodo = (todoId) => {
    setPetStatus("/src/assets/running.gif")

    setUpdateComplete((res) => !res)

    setAllTodos((prevTodo) => 
      allTodos.map((todo) => {
        if(todo.id == todoId) {
          return {
            ...todo,
            completed: true,
          };
        } else {
          return todo;
        }
    }))
    setCompletedTodos((prevTodo) => prevTodo.filter((todo) => todo.completed === true))

    setUserData((data) => {
      return {...data, level: data.level + 1}
    })
    }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  } 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home petStatus={petStatus} completedTodos={completedTodos} todos={todos} userData={userData} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} allTodos={allTodos} addTodo={addTodo} deleteTodo={deleteTodo}/>}/>
        <Route path="/tasks" element={<MyTasks petStatus={petStatus} completedTodos={completedTodos} todos={todos} userData={userData} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} allTodos={allTodos} addTodo={addTodo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/refresh' element={<Refresh />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
