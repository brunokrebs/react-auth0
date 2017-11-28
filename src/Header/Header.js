import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="app-header">
        <h1>React App Secured with Auth0</h1>
        <div className="app-header-links">
          <Link to="/contacts">Contacts</Link>
        </div>
      </div>
    );
  }
}

export default Header;
