import React, {Component} from 'react';
import {Link as ReactLink} from 'react-router-dom';
import './Link.css';
import '../BoxShadow/BoxShadow.css';

class Link extends Component {
  render() {
    return (
      <ReactLink className="react-auth0 box-shadow default-font-size" to={this.props.to}>{this.props.text}</ReactLink>
    );
  }
}

export default Link;
