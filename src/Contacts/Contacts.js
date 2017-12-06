import React, {Component} from 'react';
import axios from 'axios';
import Panel from "../DOMElements/Panel/Panel";
import Table from "../DOMElements/Table/Table";
import {withRouter} from 'react-router-dom';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {contacts: []};
    this.editContact = this.editContact.bind(this);
    this.removeContact = this.removeContact.bind(this);
    this.loadContactsList = this.loadContactsList.bind(this);
  }

  componentDidMount() {
    this.loadContactsList();
  }

  editContact(id) {
    this.props.history.push('/contacts/' + id);
  }

  removeContact(id) {
    const self = this;
    const config = {
      method: 'delete',
      url: 'http://auth0-wildcard.digituz.com.br/contacts/' + id,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
    };
    axios(config).then(function () {
      self.loadContactsList();
    }).catch(console.log);
  }

  loadContactsList() {
    const self = this;
    const config = {
      url: 'http://auth0-wildcard.digituz.com.br/contacts',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
    };

    axios(config).then(function (response) {
      self.setState({contacts: response.data});
    }).catch(console.log);
  }

  render() {
    const headers = [
      {key: 'name', text: 'Name'},
      {key: 'phone', text: 'Phone'}
    ];
    const rows = this.state.contacts;
    return (
      <Panel>
        <h2>List of Contacts</h2>
        <Table headers={headers} rows={rows} onEditClick={this.editContact} onRemoveClick={this.removeContact}/>
      </Panel>
    );
  }
}

export default withRouter(props => <Contacts {...props} />);
