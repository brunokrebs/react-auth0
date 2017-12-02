import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './Header/Header.js';
import Contacts from './Contacts/Contacts.js';
import Home from './Home/Home.js';
import Callback from "./Auth/Callback";
import * as Auth0 from 'auth0-web';

const handleAuthentication = (nextState) => {
  Auth0.handleAuthCallback();
  // Auth0.subscribe((signedIn) => {
  //   const destiny = signedIn ? '/contacts' : '/';
  //   nextState.history.replace(destiny);
  // });
};

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
    console.log('componentWillMount App.js');
    // this.setState({isAuthenticated: Auth0.isAuthenticated()});
  }

  render() {
    // console.log('------ render App.js');
    // console.log(this.state.isAuthenticated);
    // console.log('------ render App.js');
    return (
      <div className="app">
        <Route path="/" component={Header}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/contacts" component={Contacts}/>
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />
        }}/>
      </div>
    );
  }
}

export default App;
