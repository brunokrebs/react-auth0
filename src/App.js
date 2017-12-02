import React, {Component} from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import Header from './Header/Header.js';
import Contacts from './Contacts/Contacts.js';
import Home from './Home/Home.js';
import Callback from "./Auth/Callback";
import * as Auth0 from 'auth0-web';

const AppComponent = withRouter(props => <App {...props}/>);

class App extends Component {
  constructor() {
    super();
    Auth0.configure({
      domain: 'bk-samples.auth0.com',
      audience: 'https://contacts.digituz.com.br',
      clientID: '8a7myyLd6leG0HbOhMPtLaSgZ2itD3gK',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid get:contacts post:contacts delete:contacts'
    });
  }

  componentWillMount() {
    const self = this;
    Auth0.handleAuthCallback();
    Auth0.subscribe((signedIn) => {
      self.setState({signedIn});
    });
  }

  render() {
    const {pathname} = this.props.location;
    if (this.state.signedIn && pathname === '/callback') {
      return <Redirect to="/contacts"/>
    }
    return (
      <div className="app">
        <Route path="/" component={Header}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/contacts" component={Contacts}/>
        <Route path="/callback" component={Callback}/>
      </div>
    );
  }
}

export default AppComponent;
