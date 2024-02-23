import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";
import "./MyTasks.css"
import AddIcon from '@mui/icons-material/Add';

export default function MyTasks({toggleMenu, isMenuOpen}) {
    return (
        <>
            <Header toggleMenu={toggleMenu}/>
            <div className="bodyContent">
                {isMenuOpen && (
                    <SideBar />
                )}
                <div className="tasksApp">
                    <div className="tasksBoxContainer todoContainer">
                        <h2 className="tasksHeading">My Tasks <button><AddIcon/></button></h2>
                        <div className="tasksContainer todo"></div>
                    </div>
                    <div className="tasksBoxContainer completeContainer">
                        <h2 className="tasksHeading">Completed</h2>
                        <div className="tasksContainer complete"></div>

                    </div>
                    <div className="tasksBoxContainer overdue-gameContainer">
                        <div className="gameContainerTasks">
                            <h2 className="tasksHeading">Progress</h2>
                            <div className="gameContainer"></div>
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