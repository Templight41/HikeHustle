import Header from "../header/Header";
import "./Home.css"
import SideBar from "../sideBar/SideBar";
import { teal } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import TodoInput from "../todoInput/TodoInput.jsx"
import Game from "../game/Game.jsx";

export default function Home({toggleMenu, isMenuOpen, allTodos, addTodo, userData, todos, petStatus, completedTodos}) {
    const selectedButton = {
        color: "#aaa"
    }
    
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
                            <p>Monday, February 22</p>
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
                                <button style={selectedButton}>Upcoming</button>
                                <button>Completed</button>
                                <button>Overdue</button>
                            </div>
                            
                            <div className="tasksContainerBottom">
                                {todos.length > 0 ? todos.map((todo) => {if(todo.completed !== true && todos.indexOf(todo) <=2)return <li key={todo.id}>{todo.task}</li>}) : <TodoInput addTodo={addTodo} buttonText={"Add task"}/>}
                                
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