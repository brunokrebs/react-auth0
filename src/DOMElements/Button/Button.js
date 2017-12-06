import React, {Component} from 'react';
import './Button.css';
import '../Shadow/Shadow.css';

class Button extends Component {
  render() {
    return (
      <button className='react-auth0 shadow default-font-size'
              onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}

export default Button;
