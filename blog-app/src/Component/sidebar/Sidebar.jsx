import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './sidebar.css'
import {getAboutsection} from '../../services'

export default function Sidebar() {
    const [about, setAbout] = useState('')
    useEffect(() => {
        getAboutsection().then(p => {
            setAbout(p);
        })
    })
    return (
        <div className='sidebar'>
            <div className="sidebar-item">
                <span className="sidebar-title">ABOUT ME</span>
                <img className='sidebar-image' src="https://i0.wp.com/news.northeastern.edu/wp-content/uploads/2018/08/KingHuskyHead.jpg?resize=716%2C912&#038;ssl=1" alt="about-me-image" />
                <p className='about-content'>{about}</p>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-title">CATEGORIES</span>
                <ul className="sidebar-list">
                    <li className="sidebar-list-item">Life</li>
                    <li className="sidebar-list-item">Music</li>
                    <li className="sidebar-list-item">Sport</li>
                    <li className="sidebar-list-item">Tech</li>
                </ul>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-title">FOLLOW US</span>
                <div className="sidebar-social">
                    <i className="sidebar-icon fa-brands fa-square-facebook"></i>
                    <i className="sidebar-icon fa-brands fa-square-twitter"></i>
                    <i className="sidebar-icon fa-brands fa-square-pinterest"></i>
                    <i className="sidebar-icon fa-brands fa-square-instagram"></i>
                </div>
            </div>
        </div>
    )
}
