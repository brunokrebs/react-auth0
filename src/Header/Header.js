import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Auth from '../Auth/Auth.js';
import './Header.css';

class Header extends Component {
  signIn() {
    console.log('good to go');
    Auth.login();
  }

  render() {
    return (
      <div className="app-header">
        <h1>React App Secured with Auth0</h1>
        <div className="app-header-links">
          <button onClick={this.signIn}>
            Sign In
          </button>
          <Link to="/contacts" className="dashed">Contacts</Link>
        </div>
      </div>
    );
  }
}

export default Header;
