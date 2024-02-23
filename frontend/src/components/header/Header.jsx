import './Header.css'
import Avatar from '@mui/material/Avatar';
import { teal } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
    return (
        <div className="header">
            <div className="sandwichButton">
                <button id='sideBarButton'>
                    <MenuIcon style={{
                        fontSize: 34,
                        width: 34
                    }}/>
                </button>
                
            </div>

            <h2>HikeHustle</h2>

            <div className='profile'>
                <a href="/profile">
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
                </a>
            </div>
        </div>
    )
}