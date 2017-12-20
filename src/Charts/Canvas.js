import React, {Component} from 'react';
import Circles from './Circles/Circles';
import './Canvas.css';
import Auth0Logo from "./Auth0/Auth0Logo";
import Rectangles from "./Rectangles/Rectangles";

class Canvas extends Component {
  render() {
    return (
      <svg className='react-canvas'>
        <Circles />
        <Auth0Logo />
        <Rectangles />
      </svg>
    );
  }
}

export default Canvas;
