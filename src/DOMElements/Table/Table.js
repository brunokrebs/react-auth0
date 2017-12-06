import React, { Component } from 'react';
import './Table.css';

class Table extends Component {
  render() {
    const headers = this.props.headers || [];
    const rows = this.props.rows || [];
    return (
      <table className='react-auth0'>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            {headers.map((header, idx) => (
              <td key={idx}>{row[header.key]}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    )
  }
}

export default Table;
