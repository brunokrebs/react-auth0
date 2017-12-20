import React, {Component} from 'react';
import './Circles.css'

class Circles extends Component {
  render() {
    const transform = `matrix(${this.props.matrix.join(' ')})`;
    const matrix = this.props.matrix.join(',');
    return (
      <circle id={this.props.elementId} className='react-auth0' transform={transform}
              cx='50' cy='50' r='40'
              type={this.props.type}
              matrix={matrix}/>
    );
  }
}

export default Circles;
