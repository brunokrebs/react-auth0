import React, {Component} from 'react';
import './Contacts.css';
import axios from 'axios';

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {contacts: []};
  }

  componentDidMount() {
    const self = this;
    const config = {
      url: 'http://localhost:3001/contacts',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
    };

    axios(config).then(function (response) {
      self.setState({contacts: response.data});
    }).catch(console.log);
  }

  render() {
    return (
      <table className="contacts-table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
        </tr>
        </thead>
        <tbody>
        {this.state.contacts.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.phone}</td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}

export default Contacts;
