import React, {Component} from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import Header from './Header/Header.js';
import Contacts from './Contacts/Contacts.js';
import Home from './Home/Home.js';
import Callback from './Auth/Callback';
import Transactions from './Transactions/Transactions';
import * as Auth0 from 'auth0-web';
import Contact from "./Contacts/Contact";
import Transaction from "./Transactions/Transaction";
import DiagramEditor from "./DiagramEditor/DiagramEditor";
import Diagrams from "./DiagramEditor/Diagrams";

class App extends Component {
  constructor() {
    super();
    Auth0.configure({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
      responseType: 'token id_token',
      scope: 'openid'
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
    const {signedIn} = this.state;
    if (signedIn && pathname === '/callback') {
      return <Redirect to="/contacts"/>
    }
    const restrictedPaths = ['contacts', 'diagrams', 'transactions'];
    if (!signedIn && restrictedPaths.includes(`/${pathname}`)) {
      return <Redirect to="/"/>
    }
    return (
      <div className="app">
        <Route path="/" component={Header}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/diagrams" component={Diagrams}/>
        <Route exact path="/diagrams/:diagramId" component={DiagramEditor}/>
        <Route exact path="/contacts" component={Contacts}/>
        <Route exact path="/contacts/:contactId" component={Contact}/>
        <Route exact path="/transactions" component={Transactions}/>
        <Route exact path="/transactions/:transactionId" component={Transaction}/>
        <Route path="/callback" component={Callback}/>
      </div>
    );
  }
}

// withRouter makes component route-aware so we can check `this.props.location`
export default withRouter(props => <App {...props}/>);
