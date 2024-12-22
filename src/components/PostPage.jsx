import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate()
  const post = posts.find((post) => post.id.toString() === id);

  if (!post) {
    return <h2>Post not found</h2>;
  }
  const deletePost = () => {
    handleDelete(post.id);
    navigate('/'); // Navigate back to the home page after deletion
  };

  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.dateTime}</p>
      <p>{post.body}</p>
      <Link to={`/edit/${post.id}`}><button>Update</button></Link>
      <br />
      <button onClick={() => deletePost(post.id)}>Delete</button>
    </>
  );
};

export default PostPage;
