import React from 'react'
import './settings.css'
import SideBar from './../../Component/sidebar/Sidebar'
import { useEffect } from 'react'
import {checkForLoggedInUser} from '../../services'
import { useState } from 'react'

export default function Settings({updateUserInfo}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        checkForLoggedInUser().then(p =>{
            setUsername(p.username);
            setEmail(p.email);
        })
    }, [])

    const updateUser = (e) => {
        e.preventDefault();
        updateUserInfo(username, email);
    }

    return (
        <div className='settings'>
            <div className="settings-wrapper">
                <div className="settings-title">
                    <span className="settings-update-title">Update Your Account</span>
                </div>
                <form className="settings-form">
                    <label>Profile Picture</label>
                    <div className="settings-profile-picture">
                        <img src="https://i0.wp.com/news.northeastern.edu/wp-content/uploads/2018/08/KingHuskyHead.jpg?resize=716%2C912&#038;ssl=1" alt="profile-picture-user" />
                        <label htmlFor="file-input">
                            <i className="settings-profile-picture-icon fa-solid fa-image-portrait"></i>
                        </label>
                        <input type="file" id='file-input' className='file-input' />
                    </div>
                    <label>UserName</label>
                    <input type="text" value={username} disabled/>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <button className='settings-submit' onClick={updateUser}>Update</button>
                </form>
            </div>
            <SideBar />
        </div>
    )
}
