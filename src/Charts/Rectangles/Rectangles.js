import React, {Component} from 'react';
import './Rectangles.css';

class Rectangles extends Component {
  render() {
    const transform = `matrix(${this.props.matrix.join(' ')})`;
    const matrix = this.props.matrix.join(',');
    return (
      <rect id={this.props.elementId} className='react-auth0' transform={transform}
            x='300' y='10' width='100' height='100'
            type={this.props.type}
            matrix={matrix}/>
    );
  }
}

export default Rectangles;
