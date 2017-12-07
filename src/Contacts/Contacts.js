import React, {Component} from 'react';
import Panel from '../DOMElements/Panel/Panel';
import Table from '../DOMElements/Table/Table';
import {withRouter} from 'react-router-dom';
import Link from '../DOMElements/Link/Link';
import {loadEntityList, removeEntity, editEntity} from '../RestFlex/RestFlex';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {contacts: []};
    this.loadContactsList = this.loadContactsList.bind(this);
    this.editContact = this.editContact.bind(this);
    this.removeContact = this.removeContact.bind(this);
  }

  // methods
  loadContactsList = loadEntityList('contacts');
  editContact = editEntity('contacts');
  removeContact = async (id) => {
    await removeEntity('contacts')(id);
    this.loadContactsList();
  };
  componentDidMount = this.loadContactsList;

  render() {
    const headers = [
      {key: 'name', text: 'Name'},
      {key: 'phone', text: 'Phone'},
      {key: 'email', text: 'Email'},
      {key: 'heritage', text: 'Heritage'}
    ];
    const rows = this.state.contacts;
    return (
      <Panel>
        <h2>List of Contacts</h2>
        <Table headers={headers} rows={rows} onEditClick={this.editContact} onRemoveClick={this.removeContact}/>
        <Link to='/contacts/new' text='Create Contact' />
      </Panel>
    );
  }
}

export default withRouter(props => <Contacts {...props} />);
