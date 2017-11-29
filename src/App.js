import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './Header/Header.js';
import Contacts from './Contacts/Contacts.js';
import Home from './Home/Home.js';
import Callback from "./Auth/Callback";
import Auth from './Auth/Auth.js';

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    Auth.handleAuthentication(nextState.history);
  }
};

class App extends Component {
  render() {
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
