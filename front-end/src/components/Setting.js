import React from 'react';

import { auth } from '../firebase'

const Home = ({ user }) => {
  return (
    <div className="home">
      <h1>Hello, <span></span>{user.displayName}</h1>
      <img src={user.photoURL} alt="" />
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  )
}

export default Home;