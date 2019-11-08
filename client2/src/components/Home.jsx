import React from 'react';

export default function Home(props) {

  return (
    <main className="main">
      <h1>
        Welcome to <b>Ben's</b> React template.
        {
          props.currentUser ?
            <div>
              <p>Hello, {props.currentUser.username}</p>
              <button onClick={props.handleLogout}>Logout</button>
            </div>
            :
            <></>
        }
      </h1>
    </main >
  )
}

