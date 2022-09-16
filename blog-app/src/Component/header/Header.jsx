import React from 'react';
import './header.css';

export default function Header() {
  return (
    <div className='header'>
        <div className="header-titles">
            <span className="header-title-lg">BlogPost</span>
        </div>
        <img className='header-image' src="https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
    </div>
  )
}
