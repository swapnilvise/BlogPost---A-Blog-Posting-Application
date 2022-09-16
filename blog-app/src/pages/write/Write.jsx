import React from 'react'
import './write.css'
import {submitPost} from '../../services'
import { useState } from 'react'

export default function Write() {
    const [post, setPost] = useState({title:'',desc:'', category:''});
    const submitPostHandler = (e) => {
        e.preventDefault();
        submitPost(post).then(p => {
            if (p === 'New post has been added'){
                setPost({title:'', desc:'', category:''})
            } 
        })
    }
    return (
        <div className='write'>
            <img src="https://news.northeastern.edu/wp-content/uploads/2020/03/husky-zoom.jpg" alt="write-post-image" className='write-image'/>
            <form className='write-form'>
                <div className="write-form-group">
                    <label htmlFor='file-input'>
                        <i className="write-icon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id='file-input' className='button-input-file'/>
                    <input type="text" placeholder='Enter Blog Title' className='write-input' autoFocus={true} onChange={e => setPost({ ...post, title: e.target.value })} value={post.title}/>
                    {/* <input type="text" placeholder='Enter Blog Category' className='write-input' autoFocus={true} onChange={e => setPost({ ...post, category: e.target.value })} value={post.category}/> */}
                </div>
                <div className="write-form-group">
                    <textarea placeholder='Tell your story' className='write-input-text' onChange={e => setPost({ ...post, desc: e.target.value })} value={post.desc}></textarea>
                </div>
                <button className='write-submit' onClick={submitPostHandler}>Publish</button>
            </form>
        </div>
    )
}
