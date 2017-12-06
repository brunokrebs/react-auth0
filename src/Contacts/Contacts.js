import React, {Component} from 'react';
import axios from 'axios';
import Panel from "../DOMElements/Panel/Panel";
import Table from "../DOMElements/Table/Table";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {contacts: []};
  }

  componentDidMount() {
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
      { key: 'name', text: 'Name' },
      { key: 'phone', text: 'Phone' }
    ];
    const rows = this.state.contacts;
    return (
      <Panel>
        <Table headers={headers} rows={rows} />
      </Panel>
    );
  }
}

export default Contacts;
