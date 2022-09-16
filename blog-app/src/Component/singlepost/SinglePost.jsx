import { React, useState } from 'react'
import './singlePost.css'
import { getPostById } from '../../services'
import { useEffect } from 'react';

export default function SinglePost({ removePost, changePost, id, error }) {

    const [username, setusername] = useState('');
    const [post, setPost] = useState({ title: '', desc: '' });
    const [title, setTitle] = useState('');
    const [desc, setdesc] = useState('');
    const [createDate, setcreateDate] = useState('');
    const [updateDate, setupdateDate] = useState('');
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        getPostById(id).then(p => {
            const title = p.title;
            const desc = p.desc;
            setPost({ title: title, desc: desc });
            setTitle(title);
            setdesc(desc);
            setusername(p.username);
            setcreateDate(p.createDate);
            setupdateDate(p.updateDate);
        });
    }, []);

    const deletePost = (e) => {
        e.preventDefault();
        removePost(id);
    }

    const editPost = (e) => {
        e.preventDefault();
        setUpdateMode(true);
    }

    const updatePost = (e) => {
        e.preventDefault();
        changePost(id, post);
        setUpdateMode(false);
    }

    return (
        <div className='single-post'>
            <div className="single-post-wrapper">
                <img className='single-post-image' src="https://cssh.northeastern.edu/humanservices/wp-content/uploads/sites/16/2022/03/neuflag-1024x1024-c-default.png" alt="single-post-image" />
                {updateMode ? (<input type="text" className='single-post-title-input' value={post.title} onChange={(e) => setPost({...post, title: e.target.value})} />) :
                    <h1 className="single-post-title">
                        {post.title}
                        <div className="single-post-edit">
                            <i className="single-post-icon fa-solid fa-pen-clip" onClick={editPost}></i>
                            <i className="single-post-icon fa-solid fa-trash-can" onClick={deletePost}></i>
                        </div>
                    </h1>
                }
                <div className="single-post-info">
                    <span className='single-post-author'>Author : <b>{username}</b></span>
                    <span className='single-post-date'>{updateDate}</span>
                </div>
                {(updateMode) ? (
                    <textarea className='single-post-desc-input' onChange={e => setPost({ ...post, desc: e.target.value })} value={post.desc}></textarea>
                ) : (
                    <p className='single-post-desc'>
                        {post.desc}
                    </p>
                )} <label className='err-message'>{error}</label>
                {(updateMode) ? (<button className='saveButton' onClick={updatePost}>Save</button>) : (<div />)}
            </div>
        </div>
    )
}
