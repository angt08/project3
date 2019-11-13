import React from 'react';
import gitHub from '../github_fpykxh.png';
import linkedIn from '../linkedin_vnvo6s.png';
export default function Footer(props) {

  return (
    <footer>
      <a href="https://github.com/angt08/project3">
        <img className='image-footer' src={gitHub} border="0" alt="" />
      </a>
      <p id='copyright'>Space Dinos 2019</p>
    </footer>
  )
}

