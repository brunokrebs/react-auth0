import React, {Component} from 'react';
import './Circles.css'

class Circles extends Component {
  render() {
    const matrix = `matrix(${this.props.matrix.join(' ')})`;
    return (
      <circle id={this.props.elementId} className='react-auth0' transform={matrix}
              cx='50' cy='50' r='40'
              type={this.props.type}
              matrix={this.props.matrix} />
    );
  }
}

export default Circles;
