import React, {Component} from 'react';
import './Auth0Logo.css';

class Auth0Logo extends Component {
  currentX = 0;
  currentY = 0;
  moving = false;

  constructor(props) {
    super(props);
    this.selectElement = this.selectElement.bind(this);
    this.moveElement = this.moveElement.bind(this);
    this.state = {
      matrix: [1, 0, 0, 1, 0, 0]
    }
  }

  selectElement(event) {
    this.currentX = event.clientX;
    this.currentY = event.clientY;
    this.moving = true;
  }

  moveElement(event) {
    if (!this.moving) {
      return;
    }
    const dx = event.clientX - this.currentX;
    const dy = event.clientY - this.currentY;
    const newMatrix = this.state.matrix;
    newMatrix[4] += dx;
    newMatrix[5] += dy;

    this.setState({
      matrix: newMatrix
    });

    this.currentX = event.clientX;
    this.currentY = event.clientY;
  }

  releaseElement(event) {
    this.currentX = 0;
    this.currentY = 0;
    this.moving = false;
  }

  render() {
    const matrix = `matrix(${this.state.matrix.join(' ')})`;
    return (
      <path className='react-auth0-logo' d="M100 300 c-1.8 -2.9 -27.9 -85.6 -29.1 -92.2 -2.1 -10.7 -2.1 -31.4 -0.1 -42.0
    5.1 -26.7 18.6 -49.6 39.9 -67.5 10.6 -8.9 71.2 -52.0 73.1 -52.0 1.9 0 62.5 43.1 73.0 51.9
    21.1 17.8 34.2 39.5 39.5 65.6 2.5 12.1 2.7 31.7 0.4 43.9 -0.8 4.7 -7.7 27.4 -15.2 50.5 l-13.7
    42.0 -83.7 0.3 c-46.0 0.1 -83.9 -0.1 -84.1 -0.5z m149.8 -78.3 l40.9 -.5 -32.5 -23.4 c-17.8 -12.9
    -32.6 -23.6 -32.8 -23.8 -0.7 -0.6 0.9 -5.7 13.2 -43.4 l11.4 -34.6 -33.0 23.9 c-18.4 13.3 -33.4
    23.5 -34.1 23.1 -1.2 -0.7 -37.3 -26.7 -54.7 -39.4 l-10.6 -7.7 11.4 34.6 c12.4 37.8 13.9 42.9
    13.2 43.5 -0.2 0.2 -15.0 10.9 -32.8 23.8 l-32.4 23.4 40.9 0.3 40.9 0.3 12.5 38.5 12.5 38.6 12.5
    -38.4 12.6 -38.3 40.9 -0.5z"
            transform={matrix}
            onMouseDown={(event) => (this.selectElement(event))}
            onMouseMove={(event) => (this.moveElement(event))}
            onMouseUp={(event) => (this.releaseElement(event))}
      />
    )
  }
}

export default Auth0Logo;