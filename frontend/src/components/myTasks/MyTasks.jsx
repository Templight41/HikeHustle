import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";
import "./MyTasks.css"
import AddIcon from '@mui/icons-material/Add';
import TodoInput from "../todoInput/TodoInput.jsx"
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Game from "../game/Game.jsx";

export default function MyTasks({toggleMenu, isMenuOpen, allTodos, addTodo, deleteTodo, completeTodo, userData, todos, petStatus, completedTodos}) {

    // console.log(allTodos)

    return (
        <>
            <Header toggleMenu={toggleMenu} userData={userData}/>
            <div className="bodyContent">
                {isMenuOpen && (
                    <SideBar />
                )}
                <div className="tasksApp">
                    <div className="tasksBoxContainer todoContainer">
                        <h2 className="tasksHeading">My Tasks &nbsp; {todos.length} <TodoInput addTodo={addTodo}/></h2>
                        <div className="tasksContainer todo">
                            {todos.length > 0 ? todos.map((todo) => {
                                return <li key={todo.id}>{todo.task}<button onClick={() => completeTodo(todo.id)}><DoneIcon/></button></li>
                            }) : <li>No tasks<TodoInput addTodo={addTodo}/></li>}
                        </div>
                    </div>
                    <div className="tasksBoxContainer completeContainer">
                        <h2 className="tasksHeading">Completed</h2>
                        <div className="tasksContainer complete">
                            {completedTodos.map((todo) => {
                                return <li key={todo.id}>{todo.task}<button onClick={() => deleteTodo(todo.id)}><CloseIcon/></button></li>
                            })}
                        </div>

                    </div>
                    <div className="tasksBoxContainer overdue-gameContainer">
                        <div className="gameContainerTasks">
                            <h2 className="tasksHeading">Progress</h2>
                            <div className="gameElementContainer">
                                <Game petStatus={petStatus}/>
                            </div>
                        </div>

                        <div className="tasksContainerOverdue overdueContainer">
                            <h2 className="tasksHeading">Overdue</h2>
                            <div className="tasksContainer overdue">

                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </>
    )
}