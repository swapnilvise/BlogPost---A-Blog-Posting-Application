import React from 'react'
import { useState } from 'react'
import './register.css'

export default function Register({ registerUser, loginclicked, error }) {
    const [newUser, setNewUser] = useState({ username: '', email: '' });
    const [userAbout, setuserAbout] = useState({ username: '', about: '' });
    const submitHandler = (e) => {
        e.preventDefault();
        registerUser(newUser, userAbout);
        setNewUser({ username: '', email: '' });
        setuserAbout({ username: '', about: '' });
    }

    const loginHandler = (e) => {
        e.preventDefault();
        loginclicked();
    }

    return (
        <div className='register'>
            <span className="register-title">Register User</span>
            <form className='register-form'>
                <label>UserName</label>
                <input type="text" placeholder='Enter Your UserName' className='register-input' onChange={e => setNewUser({ ...newUser, username: e.target.value })} value={newUser.username} />
                <label>Email</label>
                <input type="text" placeholder='Enter Your EmailID' className='register-input' onChange={e => setNewUser({ ...newUser, email: e.target.value })} value={newUser.email} />
                <label>About You</label>
                <input type='text' placeholder='Tell us more About you' className='register-input' onChange={e => setuserAbout({ ...userAbout, username: newUser.username, about: e.target.value })} value={userAbout.about} />
                <label className='err-message'>{error}</label>
                <button className='register-register-button' onClick={submitHandler}>Register</button>
            </form>
            <button className='register-login-button' onClick={loginHandler}>Login</button>
        </div>
    )
}
