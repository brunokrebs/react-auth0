import React, {Component} from 'react';
import './Rectangles.css';

class Rectangles extends Component {
  render() {
    const matrix = `matrix(${this.props.matrix.join(' ')})`;
    return (
      <rect id={this.props.elementId} className='react-auth0' transform={matrix}
            x='300' y='10' width='100' height='100' />
    );
  }
}

export default Rectangles;
