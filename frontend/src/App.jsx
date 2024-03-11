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
import { jwtDecode } from "jwt-decode";
import { useJwt } from "react-jwt";
import Logout from './components/logout/Logout';
import Home from './components/home/Home';
import { useEffect, useState } from 'react';
import Refresh from './components/refresh/Refresh';
import MyTasks from './components/myTasks/MyTasks';
import { v4 as uuidv4 } from "uuid"
import { DBConfig } from './components/dbConfig/DBConfig';
import { initDB, useIndexedDB } from "react-indexed-db-hook";
import axios from 'axios'

initDB(DBConfig)

const apiUrl = import.meta.env.VITE_SERVER_URL


function App() {
  let token = JSON.parse(localStorage.getItem("token"));
  const [ authToken, setAuthToken ] = useState(() => token ? token.accessToken : null)
  const [ updateComplete, setUpdateComplete ] = useState(false)
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ userData, setUserData ] = useState({username: "", level: 1})
  const [ allTodos, setAllTodos ] = useState([])
  const [ todos, setTodos ] = useState([])
  const [ completedTodos, setCompletedTodos ] = useState([])
  const [ homePageStatus, setHomePageStatus ] = useState("todos")
  const { getAll, add, deleteRecord, update } = useIndexedDB("allTodos");
  const [ petStatus, setPetStatus ] = useState("./standing.gif")


  const homePageButtonStatusOnClick = (e) => {
    setHomePageStatus(e.target.value)
  }


  //getting data from local DB
  // useEffect(() => {
  //   getAll().then((todos) => {
  //     setAllTodos([...todos])
  //   });

  // }, []);


  
 const ignoreUrlList = [ '/login', '/signup', '/refresh', '/logout' ]

  // getting tasks
  useEffect(() => {
    if(authToken) {

      axios.post(apiUrl+"/user", { accessToken: authToken })
      .then((res) => {
        setUserData(() => {
          const user = res.data.user
          return { username: user.username, level: user.level, email: user.email }
        })
      })


      axios.post(apiUrl+'/tasks/all', { accessToken: authToken })
      .then((res) => {
        setAllTodos(res.data.todo)
      })
      .catch((err) => {
        console.log(err.response.status)
        if(err.response.status == 401 && !ignoreUrlList.includes(window.location.pathname)) window.location = "/login"
      })
    } else if(!authToken && !ignoreUrlList.includes(window.location.pathname)) {
      window.location = "/login"
    }
  }, [])

  
  
  // getting userData from local db
  // useEffect(() => {
  //   if(localStorage.getItem("userData")) {
  //     const userData = JSON.parse(localStorage.getItem("userData"));
  //     const email = userData.email
  //     const username = userData.username
  //     const level = userData.level

  //     setUserData(() => {
  //       return {username: username, email: email, level: level}
  //     })
  //   }
  // }, [])


  // setting todos and completed todos
  useEffect(() => {
    const allTodosCopy = [...allTodos]
    setTodos(() => allTodosCopy.filter((todo) => todo.completed == "false"))
    setCompletedTodos(() => allTodosCopy.filter((todo) => todo.completed == "true"))
  }, [allTodos])

  
  // Add todo
  const addTodo = (todoInfo) => {
    const newTodo = {taskId: uuidv4(), task: todoInfo.task, completed: "false", completeBy: "todoInfo.completeBy"}
    setAllTodos((todo) => {
      return [...todo, {...newTodo}]
    })
    // console.log(newTodo)

    // add({ ...newTodo }).then((res) => console.log(res))


    axios.post(apiUrl+'/tasks/add', { accessToken: authToken, ...newTodo })
    .then((res) => {
      // console.log(res.data)
    })
    .then(() => {
    })
    .catch((err) => {
      // console.log(err.response.status)
      if(err.response.status == 401 && !ignoreUrlList.includes(window.location.pathname)) window.location = "/login"
      if(err.response.status == 500) console.log(err.response.data.msg)
    })

  }

  // deleting todo
  const deleteTodo = (todoId) => {
    setAllTodos(allTodos.filter((todo) => todo.taskId != todoId ))
    // deleteRecord(todoId).then((res) => console.log(res))
    // console.log(todoId)

    axios.post(apiUrl+'/tasks/delete', { accessToken: authToken, taskId: todoId })
    .then((res) => {
      // console.log(res.data)
    })
    .then(() => {
    })
    .catch((err) => {
      console.log(err.response.status)
      if(err.response.status == 401 && !ignoreUrlList.includes(window.location.pathname)) window.location = "/login"
      if(err.response.status == 500) console.log(err.response.data.msg)
    })
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
    
    // console.log(allTodos)

    let updatedTodo;

    const updatedAllTodos = allTodos.map((todo) => {
      if(todo.taskId == todoId) {
        updatedTodo = {
          ...todo,
          completed: "true",
        };
        return updatedTodo;
      } else {
        return todo
      }
    })
    // console.log(updatedTodo)
    
    setAllTodos(updatedAllTodos)
    setUserData((user) => {
      // console.log(user)
      return { ...user, level: parseInt(user.level) + 1 }
    })
    // update({...updatedTodo, completed: "true"})

    

    axios.post(apiUrl+'/tasks/update', { accessToken: authToken, taskId: updatedTodo.taskId, completed: "true" })
    .then((res) => {
      // console.log(res.data)
      // setAllTodos(res.data.allTasks)
    })
    .then((res) => {
      // console.log(allTodos)
    })
    .catch((err) => {
      console.log(err.response.status)
      if(err.code == 11000) console.log("duplicate") 
      if(err.response.status == 401 && !ignoreUrlList.includes(window.location.pathname)) window.location = "/login"
      if(err.response.status == 500) console.log(err.response.data.msg)
    })

  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  } 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home homePageButtonStatusOnClick={homePageButtonStatusOnClick} homePageStatus={homePageStatus} petStatus={petStatus} completedTodos={completedTodos} todos={todos} userData={userData} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} allTodos={allTodos} addTodo={addTodo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>}/>
        <Route path="/tasks" element={<MyTasks petStatus={petStatus} completedTodos={completedTodos} todos={todos} userData={userData} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} allTodos={allTodos} addTodo={addTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} />} />
        <Route path='/signup' element={<SignUp authToken={authToken} setAuthToken={setAuthToken} apiUrl={apiUrl}/>} />
        <Route path='/login' element={<Login authToken={authToken} setAuthToken={setAuthToken} apiUrl={apiUrl}/>} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/refresh' element={<Refresh apiUrl={apiUrl}/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
