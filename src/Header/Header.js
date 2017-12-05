import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import * as Auth0 from 'auth0-web';
import Button from "../DOMElements/Button/Button";

class Header extends Component {
  render() {
    const authenticated = Auth0.isAuthenticated();
    return (
      <div className="app-header">
        <h1>React App Secured with Auth0</h1>
        <div className="app-header-links">
          {!authenticated && <Button text="Sign In with Auth0" onClick={Auth0.signIn} />}
          {authenticated && <Link to="/contacts" className="dashed">Contacts</Link>}
          {authenticated && <Button text="Sign Out" onClick={Auth0.signOut} />}
        </div>
      </div>
    );
  }
}

export default Header;
