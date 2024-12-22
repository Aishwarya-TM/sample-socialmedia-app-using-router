import React from 'react';
import Feed from './Feed';

const HomePage = ({ posts }) => {
  return (
    <>
      <Feed posts={posts} />
    </>
  );
};

export default HomePage;
