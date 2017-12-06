import React, {Component} from 'react';
import './Button.css';
import '../BoxShadow/BoxShadow.css';

class Button extends Component {
  render() {
    return (
      <button className='react-auth0 box-shadow default-font-size'
              onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}

export default Button;
