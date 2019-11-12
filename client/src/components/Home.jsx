import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {

  return (
    <main className="main">
      <Link to="/create_giftLists"><button>Add an Giftlist</button></Link>
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

