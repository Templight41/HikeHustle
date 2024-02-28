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

export default function Home({homePageButtonStatusOnClick, deleteTodo, homePageStatus, toggleMenu, isMenuOpen, allTodos, completeTodo, addTodo, userData, todos, petStatus, completedTodos}) {
    const selectedButton = {
        color: "#aaa"
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weeks = ["Sunday", "Monday", "Tuesday", "Thursday", "Friday", "Saturday"]

    const d = new Date();
    let month = months[d.getMonth()];
    let date = d.getDate()
    let week = weeks[d.getDay()]

    const [todayDate, setTodayDate] = useState(`${week}, ${month} ${date}`)
    
    return (
        <>
            <Header userData={userData} toggleMenu={toggleMenu}/>
            <div className="bodyContent">
                {isMenuOpen && (
                    <SideBar />
                )}
                <div className="homeApp">
                    <div className="greetingContainer">
                        <span className="greeting">
                            <p>{todayDate}</p>
                            <h2>Good Evening, User</h2>
                        </span>
                    </div>
                    <div className="breifDataContainer">
                        <div className="briefData">
                            <span>{completedTodos.length > 0 ? completedTodos.length : 0} Tasks Completed</span>
                            |
                            <span>Level {userData.level ? userData.level : 0}</span>
                        </div>
                    </div>
                    <div className="dataContainer">
                        <div className="myTasksContainer dataHome">
                            <div className="myTasksContainerTop">
                                <div className='profile homeProfile'>
                                    <a href="#">
                                        <Avatar
                                            sx={{ bgcolor: teal[800] }}
                                            alt="U"
                                            src="/broken-image.jpg"
                                            style={{
                                                width: '44px',
                                                height: '44px'
                                            }}
                                        >
                                            {(() => {if(userData.length > 0) return userData.username[0].toUpperCase()})()}
                                        </Avatar>
                                    </a>
                                </div>
                                <h3>My Tasks</h3>
                            </div>
                            
                            <div className="buttonList">
                                <button value={"todos"} style={homePageStatus == "todos" ? {...selectedButton} : null} onClick={homePageButtonStatusOnClick}>Upcoming</button>
                                <button value={"completed"} style={homePageStatus == "completed" ? {...selectedButton} : null} onClick={homePageButtonStatusOnClick}>Completed</button>
                                <button value={"overDue"} style={homePageStatus == "overDue" ? {...selectedButton} : null} onClick={homePageButtonStatusOnClick}>Overdue</button>
                            </div>
                            
                            <div className="tasksContainerBottom">
                                {(() => {
                                    if(homePageStatus == "todos") {
                                        if(todos.length > 0) return todos.map((todo) => {
                                            return <li key={todo.id}>{todo.task}<button onClick={() => completeTodo(todo.id)}><DoneIcon/></button></li>
                                        })
                                        return <TodoInput addTodo={addTodo} buttonText={"Add task"}/>
                                    }
                                })()}
                                {(() => {
                                    if(homePageStatus == "completed") {
                                        if(completedTodos.length > 0) {
                                            return completedTodos.map((todo) => {
                                                return <li key={todo.id}>{todo.task}<button onClick={() => deleteTodo(todo.id)}><CloseIcon/></button></li>
                                            })
                                        }
                                        return <li>No tasks completed yet</li>
                                    }
                                })()}
                                {(() => {
                                    if(homePageStatus == "overDue") {
                                        return <li>No tasks overdue yet</li>
                                    }
                                })()}
                                
                                {/* {homePageStatus == "completed" ? {completedTodos.length > 0 ? completedTodos.map((todo) => {if(todo.completed === true && completedTodos.indexOf(todo) <=2)return <li key={todo.id}>{todo.task}</li>}) : <li>No Tasks Completed</li>} : null} */}
                            </div>
                        </div>
                        <div className="gameContainer dataHome">
                            <Game petStatus={petStatus}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}