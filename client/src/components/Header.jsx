import React from 'react';
import { Link } from 'react-router-dom';
import loginpic from '../login.png';
import logoutpic from '../logout.png';

export default function Header(props) {
  let username = "";
  if (props.currentUser) username = props.currentUser.username[0].toUpperCase() + props.currentUser.username.slice(1);
  // console.log(username);
  return (
    <header>
      <div className="headingTags" >
        <Link to="/"><h1>GiftBox</h1></Link>
        {
          props.currentUser ?
            <h2>Welcome, {username}!</h2>
            :
            <></>
        }
      </div>

      <nav id="logOut">
        {
          props.currentUser ?
            <a href="#" onClick={props.handleLogout}>
              <img className="accountLogo" src={loginpic}/>
            </a>
            :
            <Link to="/login">
              <img className="accountLogo" src={logoutpic} />
            </Link>
        }
      </nav>
    </header>
  )
}

