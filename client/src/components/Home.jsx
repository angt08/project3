import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
  let divStyle = { display: 'none' };
  if (props.currentUser) {
    divStyle.display = "";
  }
  return (
    <main className="main">
      <Link id="add-giftlist-button" to="/create_giftLists">

        <div style={divStyle} class="cssCircle plusSign tooltip">
          <span class="tooltiptext">Add a Giftlist</span>
          &#43;
        </div>
      </Link>

      <div id="giftlist-home">

        {props.giftLists.map(gl => (
          <div id="giftlist-single">

            <Link to={`/giftlists/${gl.id}`}>
              <h3>{gl.title}</h3>
            </Link>

            <img className="giftlist-homeImg" src={gl.image_link} width="200px" height="200px" />

          </div>
        ))}
      </div>
    </main >
  )
}
