import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
  let divStyle = { display: 'none' };
  if (props.currentUser) {
    divStyle.display = "";
  }
  return (
    <main className="main">
      <Link to="/create_giftLists">
        <div style={divStyle} class="cssCircle plusSign">
          &#43;
          </div>
      </Link>

      <div id="giftlist-home">

      {props.giftLists.map(gl => (
        <div>
          <Link to={`/giftlists/${gl.id}`}>
            <h3>{gl.title}</h3>
          </Link>

          <img src={gl.image_link} width="200px" height="200px" />
         
        </div>
      ))}
        
      </div>



    </main >
  )
}

