import React, { useEffect } from 'react';
import {  useParams } from 'react-router-dom';

const EditPost = ({ posts, editBody, editTitle, setEditBody, setEditTitle, handleUpdate }) => {
    const { id } = useParams();

    const post = posts.find(post => post.id.toString() === id);

    useEffect(() => {
        if (post) {
            setEditBody(post.body);
            setEditTitle(post.title);
        }
    }, [post, setEditBody, setEditTitle]);  
 

    return (
        <>
            <h2>Edit Post</h2>
            <input
                type="text"
                id="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
            />
            <br />
            <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
            />
            <br />
            <button onClick={() => handleUpdate(post.id)}>Edit Post</button>
        </>
    );
};

export default EditPost;
