import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";
import "./MyTasks.css"
import AddIcon from '@mui/icons-material/Add';
import TodoInput from "../todoInput/TodoInput.jsx"
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Game from "../game/Game.jsx";

export default function MyTasks(props) {

    // console.log(allTodos)

    return (
        <>
            <Header toggleMenu={props.toggleMenu} userData={props.userData}/>
            <div className="bodyContent">
                {props.isMenuOpen && (
                    <SideBar />
                )}
                <div className="tasksApp">
                    <div className="tasksBoxContainer todoContainer">
                        <h2 className="tasksHeading">My Tasks &nbsp; {props.todos.length} <TodoInput addTodo={props.addTodo}/></h2>
                        <div className="tasksContainer todo">
                            {props.todos.length > 0 ? props.todos.map((todo) => {
                                // console.log(todo)
                                return <li key={todo.taskId}>{todo.task}<button onClick={() => props.completeTodo(todo.taskId)}><DoneIcon/></button></li>
                            }) : <li>No tasks<TodoInput addTodo={props.addTodo}/></li>}
                        </div>
                    </div>
                    <div className="tasksBoxContainer completeContainer">
                        <h2 className="tasksHeading">Completed</h2>
                        <div className="tasksContainer complete">
                            {props.completedTodos.map((todo) => {
                                return <li key={todo.taskId}>{todo.task}<button onClick={() => props.deleteTodo(todo.taskId)}><CloseIcon/></button></li>
                            })}
                        </div>

                    </div>
                    <div className="tasksBoxContainer overdue-gameContainer">
                        <div className="gameContainerTasks">
                            <h2 className="tasksHeading">Progress</h2>
                            <div className="gameElementContainer">
                                <Game petStatus={props.petStatus}/>
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