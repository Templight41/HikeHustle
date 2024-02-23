import './Header.css'
import Avatar from '@mui/material/Avatar';
import { teal } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

export default function Header({toggleMenu}) {
    return (
        <div className="header">
            <div className="sandwichButton">
                <button id='sideBarButton' onClick={toggleMenu}>
                    <MenuIcon style={{
                        fontSize: 34,
                        width: 34
                    }}/>
                </button>
                
            </div>

            <h2>HikeHustle</h2>

            <div className='profile'>
                <Link to="/profile">
                <Avatar
                    sx={{ bgcolor: teal[800] }}
                    alt="Remy Sharp"
                    src="/broken-image.jpg"
                    style={{
                        width: 'inherit',
                        height: 'inherit',
                        fontSize: 14
                    }}
                >
                    B
                </Avatar>
                </Link>
            </div>
        </div>
    )
}