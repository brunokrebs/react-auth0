import React, {Component} from 'react';
import './Transaction.css';
import LabeledInput from "../DOMElements/LabeledInput/LabeledInput";
import Panel from "../DOMElements/Panel/Panel";

class Transaction extends Component {
  render() {
    return (
      <Panel>
        <h2>Do I Look Like a Transaction?</h2>
        <LabeledInput label="Date:" placeholder="yyyy/mm/dd"/>
        <LabeledInput label="Amount:" placeholder="16.78"/>
      </Panel>);
  }
}

export default Transaction;
