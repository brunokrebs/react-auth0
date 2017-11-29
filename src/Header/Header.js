import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Auth from '../Auth/Auth.js';
import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    Auth.login();
  }

  signOut() {
    Auth.logout(this.props.history);
  }

  render() {
    const authenticated = Auth.isAuthenticated();
    return (
      <div className="app-header">
        <h1>React App Secured with Auth0</h1>
        <div className="app-header-links">
          {!authenticated && <button onClick={this.signIn}>Sign In</button>}
          {authenticated && <Link to="/contacts" className="dashed">Contacts</Link>}
          {authenticated && <button onClick={() => (this.signOut())}>Sign Out</button>}
        </div>
      </div>
    );
  }
}

export default Header;
