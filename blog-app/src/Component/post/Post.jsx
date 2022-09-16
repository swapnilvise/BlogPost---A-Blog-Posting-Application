import {React, useReducer} from 'react'
import './post.css'

export default function Post({openSinglePost2, post}) {
    
    const data = post[1];

    const openSinglePostHandler = () => {
        const id = post[0];
        openSinglePost2(id);
    }

    return (
        <div className='post'>
            <img
                className='post-image'
                src="https://cssh.northeastern.edu/humanservices/wp-content/uploads/sites/16/2022/03/neuflag-1024x1024-c-default.png"
                alt="post-image"
            />
            <div className="post-info">
                <div className="post-category">
                    <span className="post-category">{data.category}</span>
                </div>

                <span className="post-title" onClick={openSinglePostHandler}>
                    {data.title}
                </span>
                <hr />
                <span className="post-date">{new Date(data.createDate).toDateString()}</span>
            </div>
            <p className="post-description">
                {data.desc}
            </p>
        </div>
    )
}
