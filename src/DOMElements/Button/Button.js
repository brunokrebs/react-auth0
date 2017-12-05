import React, {Component} from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return (
      <button className='react-auth0' onClick={this.props.onClick}>{this.props.text}</button>
    )
  }
}

export default Button;
