import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import HomePage from './components/HomePage';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import axios from 'axios';
import EditPost from './components/EditPost';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [postBody, setPostBody] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [editBody, setEditBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
 

  // using axios to get post
  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const response = await axios.get(`http://localhost:3500/posts`)
        setPosts(response.data)
      }
      catch(error)
      {
        console.log(error)
      }
    }
    fetchData()
  },[]) //

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      post.body.toLowerCase().includes(search.toLowerCase()) ||
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse()); // Display the latest post first
  }, [posts, search]);
 
const handleDelete = async(id) =>{
  try{
    await axios.delete(`http://localhost:3500/posts/${id}`)
    const postList = posts.filter(post => post.id !== id)
    setPosts(postList)
    
  }
  catch(error){
    console.log(error)
  }
}
const handleUpdate = async (id) => {
  try {
      const updatedPost = { id, title: editTitle,  dateTime: new Date().toLocaleString(), body: editBody };
      
      const response = await axios.put(`http://localhost:3500/posts/edit/${id}`, updatedPost);
      
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));

      setEditBody('');
      setEditTitle('');   
      navigate('/');
  } catch (error) {
      console.log(error);
  }
};
  
  return (
    <Router>
      <Header />
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<HomePage posts={searchResults} />} />
        <Route path="post" >
          <Route index element={<NewPost posts={posts}
            postBody={postBody}
            postTitle={postTitle}
            setPostBody={setPostBody}
            setPostTitle={setPostTitle}
            setPosts={setPosts} />} />
            <Route path=':id' element ={<PostPage  posts={posts} handleDelete={handleDelete}/>}/>
        </Route>
        <Route path="/about" element={<About />} />
        <Route path ='/edit/:id' element ={<EditPost posts={posts} handleUpdate={handleUpdate} editBody={editBody} editTitle={editTitle} setEditBody={setEditBody} setEditTitle={setEditTitle}/>}/>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
