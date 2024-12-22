import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({search, setSearch}) => {
  return (
    <nav>
      <input type="text"  
      id="search"
      placeholder='Search a post'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
       />
       <br />
      <Link to="/">Home</Link> <br />
      <Link to="/post">Post</Link> <br />
      <Link to="/about">About</Link> <br />
    </nav>
  );
};

export default Navbar;
