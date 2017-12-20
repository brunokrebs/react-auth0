import React, {Component} from 'react';
import Circles from './Circles/Circles';
import Panel from '../DOMElements/Panel/Panel';
import './Charts.css';
import Auth0Logo from "./Auth0/Auth0Logo";

class Charts extends Component {
  render() {
    return (
      <Panel>
        <svg className='react-canvas'>
          <Circles />
          <Auth0Logo />
        </svg>
      </Panel>
    );
  }
}

export default Charts;
