import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import * as Auth0 from 'auth0-web';

class Header extends Component {
  render() {
    const authenticated = Auth0.isAuthenticated();
    return (
      <div className="app-header">
        <h1>React App Secured with Auth0</h1>
        <div className="app-header-links">
          {!authenticated && <button onClick={Auth0.signIn}>Sign In</button>}
          {authenticated && <Link to="/contacts" className="dashed">Contacts</Link>}
          {authenticated && <button onClick={() => (Auth0.signOut())}>Sign Out</button>}
        </div>
      </div>
    );
  }
}

export default Header;
