import React from 'react';
import './topbar.css';

export default function Topbar({ Homeclicked, WriteClicked, Logoutclicked, settingclicked }) {
    
    const writeClickHandler = (e) => {
        e.preventDefault();
        WriteClicked();
    }

    const homeClickHandler = (e) => {
        e.preventDefault();
        Homeclicked();
    }

    const logoutClickHandler = (e) => {
        e.preventDefault();
        Logoutclicked();
    }

    const settingsHandler = (e) => {
        e.preventDefault();
        settingclicked();
    }
    
    return (
        <div className="topbar">
            <div className="top-left">
                <i className="top-icon fa-brands fa-square-facebook"></i>
                <i className="top-icon fa-brands fa-square-twitter"></i>
                <i className="top-icon fa-brands fa-square-pinterest"></i>
                <i className="top-icon fa-brands fa-square-instagram"></i>
            </div>
            <div className="top-center">
                <ul className="top-list">
                    <li className="top-list-item" onClick={homeClickHandler}>HOME</li>
                    <li className="top-list-item" onClick={writeClickHandler}>WRITE</li>
                    <li className="top-list-item" onClick={logoutClickHandler}>LOGOUT</li>
                </ul>
            </div>
            <div className="top-right">
                <img
                    className='top-image'
                    src="https://i0.wp.com/news.northeastern.edu/wp-content/uploads/2018/08/KingHuskyHead.jpg?resize=716%2C912&#038;ssl=1"
                    alt="profile-logo"
                onClick={settingsHandler}/>
            </div>
        </div>
    )
}
