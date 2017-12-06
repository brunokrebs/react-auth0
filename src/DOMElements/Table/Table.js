import React, { Component } from 'react';

class Table extends Component {
  render() {
    const headers = this.props.headers || [];
    const rows = this.props.rows || [];
    return (
      <table>
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
