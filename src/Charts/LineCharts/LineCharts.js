import React, {Component} from 'react';
import './LineCharts.css';

class LineCharts extends Component {
  render() {
    const lineData = [
      {x: 0, y: 30},
      {x: 15, y: 45},
      {x: 30, y: 48},
      {x: 345, y: 52},
    ];

    return (
      <svg className='margin-top react-auth0 line-charts' viewBox='-20 -20 490 240' transform='scale(1, -1)'>

        <line x1="0" y1="-10" x2="0" y2="200" stroke="#999"/>
        <line x1="-10" y1="0" x2="450" y2="0" stroke="#999"/>

        <polyline
          fill="none"
          stroke="#d90913"
          stroke-width="2"
          points="0,30 15,45 30,48 45,52"/>
      </svg>
    );
  }
}

export default LineCharts;
