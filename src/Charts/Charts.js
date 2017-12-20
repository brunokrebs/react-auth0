import React, {Component} from 'react';
import Circles from './Circles/Circles';
import Panel from '../DOMElements/Panel/Panel';
import './Charts.css';

class Charts extends Component {
  render() {
    return (
      <Panel>
        <svg className='react-canvas'>
          <Circles />
        </svg>
      </Panel>
    );
  }
}

export default Charts;
