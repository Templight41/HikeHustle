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
import { DBConfig } from './components/dbConfig/DBConfig';
import { initDB, useIndexedDB } from "react-indexed-db-hook";

initDB(DBConfig)

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


  const homePageButtonStatusOnClick = (e) => {
    setHomePageStatus(e.target.value)
  }

  const { getAll, add, deleteRecord, update } = useIndexedDB("allTodos");
  const db = useIndexedDB("allTodos")

  //getting data from local DB
  useEffect(() => {
    getAll().then((todos) => {
      setAllTodos([...todos])
    });

  }, []);
  
  
  //getting userData from local  db
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

  // setting todos and completed todos
  useEffect(() => {
    const allTodosCopy = [...allTodos]
    setTodos(() => allTodosCopy.filter((todo) => todo.completed == "false"))
    setCompletedTodos(() => allTodosCopy.filter((todo) => todo.completed == "true"))
  }, [allTodos])

  
  // Add todo
  const addTodo = (todoInfo) => {
    const newTodo = {id: uuidv4(), task: todoInfo.task, completed: "false", completeBy: "todoInfo.completeBy"}
    setAllTodos((todo) => {
      return [...todo, {...newTodo}]
    })
    add({ ...newTodo }).then((res) => console.log(res))

  }

  // deleting todo
  const deleteTodo = (todoId) => {
    setAllTodos(allTodos.filter((todo) => todo.id != todoId ))
    deleteRecord(todoId).then((res) => console.log(res))
  }


  // running pet feature
  useEffect(() => {
    const timer = setTimeout(() => {
        setPetStatus((status) => {
            return "./standing.gif"
        })
    }, 3000);
    return () => clearTimeout(timer);
  }, [petStatus]);


  // Todo Complete
  const completeTodo = (todoId) => {
    setPetStatus("./running.gif")

    setUpdateComplete((res) => !res)

    setAllTodos((prevTodo) => 
      allTodos.map((todo) => {
        if(todo.id == todoId) {
          update({...todo, completed: "true"})
          return {
            ...todo,
            completed: "true",
          };
        } else {
          return todo;
        }
    }))
    // setCompletedTodos((prevTodo) => prevTodo.filter((todo) => todo.completed == "true"))


    setUserData((data) => {
      return {...data, level: data.level + 1}
    })
  }
  console.log(completedTodos)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  } 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home homePageButtonStatusOnClick={homePageButtonStatusOnClick} homePageStatus={homePageStatus} petStatus={petStatus} completedTodos={completedTodos} todos={todos} userData={userData} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} allTodos={allTodos} addTodo={addTodo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>}/>
        <Route path="/tasks" element={<MyTasks petStatus={petStatus} completedTodos={completedTodos} todos={todos} userData={userData} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} allTodos={allTodos} addTodo={addTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} />} />
        <Route path='/signup' element={<SignUp apiUrl={apiUrl}/>} />
        <Route path='/login' element={<Login apiUrl={apiUrl}/>} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/refresh' element={<Refresh apiUrl={apiUrl}/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
