import React from 'react';
import { Link } from 'react-router-dom';
export default function Header(props) {

  return (
    <header>
      <div className="headingTags" >
        <h1>GiftBox</h1>
        {
          props.currentUser ?
            <h2>Welcome, {props.currentUser.username}</h2>
            :
            <></>
        }
      </div>
      
      <nav>

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

