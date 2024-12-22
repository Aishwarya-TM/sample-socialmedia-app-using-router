import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <>
    <Link to={`post/${post.id}`} >
      <h2>{post.title}</h2>
      <p>{post.dateTime}</p>
      </Link>
      <p>{post.body}</p>
    </>
  );
};

export default Post;
