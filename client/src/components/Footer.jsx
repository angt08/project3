import React from 'react';
import gitHub from '../github.png';
// import linkedIn from '../linkedin_vnvo6s.png';
export default function Footer(props) {

  return (
    <footer>
      <p className="footerBlock">Follow Us On</p>
      <a href="https://github.com/angt08/project3">
        {/* <img className="footerBlock" src={gitHub} border="0" alt="" /> */}
        <div className="footerImg"></div>
      </a>
      <p className="footerBlock">Space Dinos 2019</p>
    </footer>
  )
}

