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
import { IndexedDB, AccessDB } from "react-indexed-db-hook";


const apiUrl = "http://localhost:8080"



function App() {
  const [updateComplete, setUpdateComplete] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({level: 1})
  const [allTodos, setAllTodos] = useState([])
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [ homePageStatus, setHomePageStatus ] = useState("todos")

  const [petStatus, setPetStatus] = useState("./standing.gif")

  console.log(completedTodos)


  const homePageButtonStatusOnClick = (e) => {
    setHomePageStatus(e.target.value)
    e.target.className = 
    console.log("onclick")
  }
  console.log(homePageStatus)
  useEffect(() => {
    if(localStorage.getItem("token")) {
      setUserData(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const email = token.email
        const username = token.username
        const level = 1
    
        return {username: username, email: email, level: level}
      })

    }
  }, [])

  console.log(userData)

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
            return "./standing.gif"
        })
    }, 2500);
    return () => clearTimeout(timer);
  }, [petStatus]);

  // Todo Complete
  const completeTodo = (todoId) => {
    setPetStatus("./running.gif")

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
    <IndexedDB
      name="HikeHustle"
      version={1}
      objectStoresMeta={[
        {
          store: "aLLTodos",
          storeSchema: [
            { name: "id", keypath: "id", options: { unique: true }},
            { name: "task", keypath: "email", options: { unique: false }},
            { name: "completed", keypath: "completed", options: { unique: false}},
            { name: "completeBy", keypath: "completeBy", options: { unique: false }}
          ]
        }
      ]}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home homePageButtonStatusOnClick={homePageButtonStatusOnClick} homePageStatus={homePageStatus} petStatus={petStatus} completedTodos={completedTodos} todos={todos} userData={userData} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} allTodos={allTodos} addTodo={addTodo} deleteTodo={deleteTodo}/>}/>
          <Route path="/tasks" element={<MyTasks petStatus={petStatus} completedTodos={completedTodos} todos={todos} userData={userData} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} allTodos={allTodos} addTodo={addTodo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>} />
          <Route path='/signup' element={<SignUp apiUrl={apiUrl}/>} />
          <Route path='/login' element={<Login apiUrl={apiUrl}/>} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/refresh' element={<Refresh apiUrl={apiUrl}/>} />
        </Routes>
      </BrowserRouter>
    </IndexedDB>
    
  )
}

export default App
