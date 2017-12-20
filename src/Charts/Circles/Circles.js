import React, {Component} from 'react';
import './Circles.css'
import {selectElement, moveElement, releaseElement} from "../Movements/Movements";

class Circles extends Component {
  constructor(props) {
    super(props);
    this.selectElement = selectElement.bind(this);
    this.moveElement = moveElement.bind(this);
    this.releaseElement = releaseElement.bind(this);
    this.state = {
      matrix: [1, 0, 0, 1, 0, 0]
    }
  }

  render() {
    const matrix = `matrix(${this.state.matrix.join(' ')})`;
    return (
      <circle className='react-auth0' cx="50" cy="50" r="40" transform={matrix}
              onMouseDown={(event) => (this.selectElement(event))}
              onMouseMove={(event) => (this.moveElement(event))}
              onMouseUp={(event) => (this.releaseElement(event))}/>
    );
  }
}

export default Circles;
