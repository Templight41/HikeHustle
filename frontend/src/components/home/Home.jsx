import Header from "../header/Header";
import "./Home.css"
import SideBar from "../sideBar/SideBar";
import { teal } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';

export default function Home() {
    const selectedButton = {
        color: "#aaa"
    }
    
    return (
        <>
            <Header />
            <div className="bodyContent">
                <SideBar/>
                <div className="homeApp">
                    <div className="greetingContainer">
                        <span className="greeting">
                            <p>Monday, February 22</p>
                            <h2>Good Evening, User</h2>
                        </span>
                    </div>
                    <div className="breifDataContainer">
                        <div className="briefData">
                            <span>0 Tasks Completed</span>
                            |
                            <span>Level 14</span>
                        </div>
                    </div>
                    <div className="dataContainer">
                        <div className="myTasksContainer dataHome">
                            <div className="myTasksContainerTop">
                                <div className='profile homeProfile'>
                                    <a href="/profile">
                                        <Avatar
                                            sx={{ bgcolor: teal[800] }}
                                            alt="Remy Sharp"
                                            src="/broken-image.jpg"
                                            style={{
                                                width: '44px',
                                                height: '44px'
                                            }}
                                        >
                                            B
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
                                <button><AddIcon/>Add task</button>
                            </div>
                        </div>
                        <div className="gameContainer dataHome">
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}