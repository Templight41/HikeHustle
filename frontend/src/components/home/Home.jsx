import Header from "../header/Header";
import "./Home.css"
import SideBar from "../sideBar/SideBar";
import { teal } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import TodoInput from "../todoInput/TodoInput.jsx"
import Game from "../game/Game.jsx";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

export default function Home(props) {
    const selectedButton = {
        color: "#aaa"
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weeks = ["Sunday", "Monday", "Tuesday", "Thursday", "Friday", "Saturday"]

    const d = new Date();
    let month = months[d.getMonth()];
    let date = d.getDate()
    let week = weeks[d.getDay() - 1]

    const [todayDate, setTodayDate] = useState(`${week}, ${month} ${date}`)
    
    return (
        <>
            <Header userData={props.userData} toggleMenu={props.toggleMenu}/>
            <div className="bodyContent">
                {props.isMenuOpen && (
                    <SideBar />
                )}
                <div className="homeApp">
                    <div className="greetingContainer">
                        <span className="greeting">
                            <p>{todayDate}</p>
                            <h2>Good Evening, {props.userData.username}</h2>
                        </span>
                    </div>
                    <div className="breifDataContainer">
                        <div className="briefData">
                            <span>{props.completedTodos.length > 0 ? props.completedTodos.length : 0} Tasks Completed</span>
                            |
                            <span>Level {props.userData.level ? props.userData.level : 0}</span>
                        </div>
                    </div>
                    <div className="dataContainer">
                        <div className="myTasksContainer dataHome">
                            <div className="myTasksContainerTop">
                                <div className='profile homeProfile'>
                                    <a href="#">
                                        <Avatar
                                            sx={{ bgcolor: teal[800] }}
                                            alt={props.userData.username.toUpperCase()}
                                            src="/broken-image.jpg"
                                            style={{
                                                width: '44px',
                                                height: '44px'
                                            }}
                                        >
                                            {(() => {if(props.userData.length > 0) return props.userData.username[0].toUpperCase()})()}
                                        </Avatar>
                                    </a>
                                </div>
                                <h3>My Tasks</h3>
                            </div>
                            
                            <div className="buttonList">
                                <button value={"todos"} style={props.homePageStatus == "todos" ? {...selectedButton} : null} onClick={props.homePageButtonStatusOnClick}>Upcoming</button>
                                <button value={"completed"} style={props.homePageStatus == "completed" ? {...selectedButton} : null} onClick={props.homePageButtonStatusOnClick}>Completed</button>
                                <button value={"overDue"} style={props.homePageStatus == "overDue" ? {...selectedButton} : null} onClick={props.homePageButtonStatusOnClick}>Overdue</button>
                            </div>
                            
                            <div className="tasksContainerBottom">
                                {(() => {
                                    if(props.homePageStatus == "todos") {
                                        if(props.todos.length > 0) return props.todos.slice(0,3).map((todo) => {
                                            return <li key={todo.taskId}>{todo.task}<button onClick={() => props.completeTodo(todo.taskId)}><DoneIcon/></button></li>
                                        })
                                        return <TodoInput addTodo={props.addTodo} buttonText={"Add task"}/>
                                    }
                                })()}
                                {(() => {
                                    if(props.homePageStatus == "completed") {
                                        if(props.completedTodos.length > 0) {
                                            return props.completedTodos.map((todo) => {
                                                return <li key={todo.taskId}>{todo.task}<button onClick={() => props.deleteTodo(todo.taskId)}><CloseIcon/></button></li>
                                            })
                                        }
                                        return <li>No tasks completed yet</li>
                                    }
                                })()}
                                {(() => {
                                    if(props.homePageStatus == "overDue") {
                                        return <li>No tasks overdue yet</li>
                                    }
                                })()}
                                
                                {/* {props.homePageStatus == "completed" ? {props.completedTodos.length > 0 ? props.completedTodos.map((todo) => {if(todo.completed === true && props.completedTodos.indexOf(todo) <=2)return <li key={todo.id}>{todo.task}</li>}) : <li>No Tasks Completed</li>} : null} */}
                            </div>
                        </div>
                        <div className="gameContainer dataHome">
                            <Game petStatus={props.petStatus}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}