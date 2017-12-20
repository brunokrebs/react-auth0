import React, {Component} from 'react';
import './Canvas.css';

class Canvas extends Component {
  render() {
    return (
      <svg className='react-canvas'>
        {this.props.children}
      </svg>
    );
  }
}

export default Canvas;
