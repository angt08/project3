import React from 'react';
import { Link } from 'react-router-dom';
export default function Header(props) {

  return (
    <header>
      <h1>GiftBox</h1>
      <nav>
        {
          props.currentUser ?
            <p>Welcome, {props.currentUser.username}</p>
            :
            <></>
        }
        <Link to="/">Home</Link>
        {
          props.currentUser ?
            <a href="#" onClick={props.handleLogout}>Logout</a>
            :
            <Link to="/login">Login</Link>
        }
      </nav>
    </header>
  )
}

