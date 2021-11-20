import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import "./Header.css";
import HeaderOption from '../HeaderOption/HeaderOption';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { logout, selectUser } from '../../features/userSlice';
import { signOut } from '@firebase/auth';
import { auth } from '../../firebase';
import { IconButton, Tooltip } from '@mui/material';

function Header() {

    const user = useSelector(selectUser);
    
    const dispatch = useDispatch();

    const logoutOfApp = () => {
        dispatch(logout());
        signOut(auth)
        .then(()=>alert('You are signed out'))
        .catch(err => alert('Oops!! try again'))
    }

    return (
        <div className="header"> 

            <div className="header__left">
                
                <img 
                    src="./logo/download.jpg" 
                    alt="" 
                />

                <div className="header__search">
                    <SearchIcon />
                    <input type="text" />
                </div>
            </div>

            {!user? null: (

                <div className="header__right">
                    <HeaderOption Icon={HomeIcon} title="Home" />
                    <HeaderOption Icon={SupervisorAccountIcon} title="Supervisor" />
                    <HeaderOption Icon={BusinessCenterIcon} title="Business" />
                    <HeaderOption Icon={ChatIcon} title="Chat" />
                    <HeaderOption Icon={NotificationsIcon} title="Notifications" />
                    <HeaderOption onClick={logoutOfApp} avatar={true} title="me" />
                        
                </div>
            )}

        </div>
    )
}

export default Header
