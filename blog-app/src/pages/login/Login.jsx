import {React, useEffect, useState} from 'react'
import Register from '../register/Register';
import './login.css'

export default function Login({loginHandler, register, error}) {
  const [details, setDetails] = useState({ name: '' });
  const [err, setErr] = useState('');

  const loginClicked = (e) => {
    e.preventDefault();
    loginHandler(details);
  }

  const registerHandler = (e) => {
    e.preventDefault();
    register();
  }

  return (
    <div className='login'>
        <span className="login-title">Login</span>
        <form className='login-form'>
            <label>UserName</label>
            <input type="text" placeholder='Enter Your UserName' className='login-input' onChange={e => setDetails({...details, name:e.target.value})} value={details.name}/>
            <label className='err-message'>{error}</label>
            <button className='login-button' onClick={loginClicked}>Login</button>
        </form>
        <button className='register-button' onClick={registerHandler}>Register</button>
    </div>
  )
}
