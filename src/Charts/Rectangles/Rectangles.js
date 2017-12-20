import React, {Component} from 'react';
import {selectElement, moveElement, releaseElement} from "../Movements/Movements";
import './Rectangles.css';

class Rectangles extends Component {
  constructor(props) {
    super(props);
    this.selectElement = selectElement.bind(this);
    this.moveElement = moveElement.bind(this);
    this.releaseElement = releaseElement.bind(this);
    this.updateElementLocation = props.updateElementLocation;
  }

  render() {
    const matrix = `matrix(${this.props.matrix.join(' ')})`;
    return (
      <rect id={this.props.elementId} className='react-auth0' x="300" y="10" width="100" height="100"
            onMouseDown={(event) => (this.selectElement(event))}
            onMouseMove={(event) => (this.moveElement(event))}
            onMouseUp={(event) => (this.releaseElement(event))}
            transform={matrix}/>
    );
  }
}

export default Rectangles;
