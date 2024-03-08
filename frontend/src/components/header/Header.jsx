import './Header.css'
import Avatar from '@mui/material/Avatar';
import { teal } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

export default function Header(props) {
    return (
        <div className="header">
            <div className="sandwichButton">
                <button id='sideBarButton' onClick={props.toggleMenu}>
                    <MenuIcon style={{
                        fontSize: 34,
                        width: 34
                    }}/>
                </button>
                
            </div>

            <h2>HikeHustle</h2>

            <div className='profile'>
                <Link to="#">
                    <Avatar
                        sx={{ bgcolor: teal[800] }}
                        alt={props.userData.username.toUpperCase()}
                        src="/broken-image.jpg"
                        style={{
                            width: 'inherit',
                            height: 'inherit',
                            fontSize: 14
                        }}
                    >
                        {(() => {if(props.userData.length > 0) return props.userData.username[0].toUpperCase()})()}
                    </Avatar>
                </Link>
            </div>
        </div>
    )
}