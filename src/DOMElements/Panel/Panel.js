import React, {Component} from 'react';
import './Panel.css';
import '../BoxShadow/BoxShadow.css';

class Panel extends Component {
  render() {
    return (
      <div className='react-auth0 box-shadow'>
        {this.props.children}
      </div>
    )
  }
}

export default Panel;
