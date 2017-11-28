import React, {Component} from 'react';
import './Contacts.css';

class Contacts extends Component {
  render() {
    return (
      <table className="contacts-table">
        <tr><th>Name</th><th>Phone</th></tr>
        <tr><td>Bruno Krebs</td><td>(51) 98121 8604</td></tr>
      </table>
    );
  }
}

export default Contacts;
