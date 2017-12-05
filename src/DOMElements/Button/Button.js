import React, {Component} from 'react';
import './Button.css';
import '../BoxShadow/BoxShadow.css';

class Button extends Component {
  render() {
    return (
      <button className='react-auth0 box-shadow' onClick={this.props.onClick}>{this.props.text}</button>
    )
  }
}

export default Button;
