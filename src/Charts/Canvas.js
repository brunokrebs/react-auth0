import React, {Component} from 'react';
import './Canvas.css';

class Canvas extends Component {
  render() {
    return (
      <svg className='react-canvas' onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}
           onMouseMove={this.props.onMouseMove}>
        {this.props.children}
      </svg>
    );
  }
}

export default Canvas;
