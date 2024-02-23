import "./SideBar.css"
import HomeIcon from '@mui/icons-material/Home';
import HikingIcon from '@mui/icons-material/Hiking';

export default function SideBar() {

    const homeStyle = {
        backgroundColor: window.location.pathname == "/" ? '#4D4D4D' : ""
    }

    const myTasksStyle = {
        backgroundColor: window.location.pathname == "/tasks" ? '#4D4D4D' : ""
    }
    
    return (
        <div className="sideBar">
            <a href="/" style={homeStyle}><HomeIcon /><span>Home</span></a>
            <a href="/tasks" style={myTasksStyle}><HikingIcon /><span>My tasks</span></a>
        </div>
    )
}