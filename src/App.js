import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Header from './Header/Header.js';
import Contacts from './Contacts/Contacts.js';
import Home from './Home/Home.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Route exact path="/" component={Home}/>
        <Route exact path="/contacts" component={Contacts}/>
      </div>
    );
  }
}

export default App;
