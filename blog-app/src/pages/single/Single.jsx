import React from 'react'
import Sidebar from '../../Component/sidebar/Sidebar'
import SinglePost from '../../Component/singlepost/SinglePost'
import './single.css'

export default function Single() {
  return (
    <div className='single'>
        <SinglePost />
        <Sidebar />
    </div>
  )
}
