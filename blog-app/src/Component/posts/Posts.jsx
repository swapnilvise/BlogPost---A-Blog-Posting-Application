import React from 'react'
import './posts.css'
import Post from '../post/Post'
import {getPostById} from '../../services'

export default function Posts({ openSinglePost1, posts }) {
  const allPosts = Object.entries(posts);
  
  const openSinglePost2 = (id) => {
    openSinglePost1(id);

  }

  return (
    <div className='posts'>
      {
        allPosts.map(p => (
          <Post openSinglePost2={openSinglePost2} post={p} />
        ))
      }
    </div>
  )
}
