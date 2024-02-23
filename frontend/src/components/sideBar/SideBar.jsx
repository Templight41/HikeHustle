import "./SideBar.css"
import HomeIcon from '@mui/icons-material/Home';
import HikingIcon from '@mui/icons-material/Hiking';
import { Link } from "react-router-dom";

export default function SideBar() {

    const homeStyle = {
        backgroundColor: window.location.pathname == "/" ? '#4D4D4D' : ""
    }

    const myTasksStyle = {
        backgroundColor: window.location.pathname == "/tasks" ? '#4D4D4D' : ""
    }
    
    return (
        <div className="sideBar">
            <Link to="/" style={homeStyle}><HomeIcon /><span>Home</span></Link>
            <Link to="/tasks" style={myTasksStyle}><HikingIcon /><span>My tasks</span></Link>
        </div>
    )
}