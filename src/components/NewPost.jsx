import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewPost = ({ posts, postTitle, postBody, setPostTitle, setPostBody, setPosts }) => {
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newPost = {
      id,
      title: postTitle,
      dateTime: new Date().toLocaleString(), // Converts to readable date & time
      body: postBody,
    };

    // using axios to add a post
    const post = await axios.post(`http://localhost:3500/posts`,newPost)
    //
    const updatedPosts = [...posts, post.data];
    setPosts(updatedPosts);
    console.log(updatedPosts);
    setPostBody('');
    setPostTitle('');
    navigate('/'); // Navigate to HomePage after submitting
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter a title"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />{' '}
        <br />
        <textarea
          id="body"
          required
          placeholder="Enter a body"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />{' '}
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default NewPost;
