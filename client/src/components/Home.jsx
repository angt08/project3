import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {

  return (
    <main className="main">
      {
        props.currentUser ?
          <div>
            <p>Hello, {props.currentUser.username}</p>
            <button onClick={props.handleLogout}>Logout</button>
            <Link to="/create_giftlists"><button>Add an Giftlist</button></Link>
          </div>
          :
          <></>
      }
      {props.giftLists.map(gl => (
        <div>
          <Link to={`/giftlists/${gl.id}`}><h3>{gl.title}</h3></Link>
          <img src={gl.image_link} />
          <p>{gl.description}</p>
          <p>Due Date: {gl.due_date}</p>
        </div>
      ))}
    </main >
  )
}

