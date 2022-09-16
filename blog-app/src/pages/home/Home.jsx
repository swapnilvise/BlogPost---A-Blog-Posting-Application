import { React, useState, useEffect } from 'react'
import './home.css'
import Header from '../../Component/header/Header'
import Posts from '../../Component/posts/Posts'
import Sidebar from '../../Component/sidebar/Sidebar'
import { getPosts } from './../../services'

export default function Home({OpenPost}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const res = getPosts().then( p => {
      setPosts(p);
    }
    );
  }, [])

  const openSinglePost1 = (id) => {
    OpenPost(id);
  }

  return (
    <>
      <Header />
      <div className='home-page'>
        <Posts openSinglePost1={openSinglePost1} posts={posts}/>
        <Sidebar />
      </div>
    </>
  )
}
