import React, {Component} from 'react';
import './Transaction.css';
import LabeledInput from "../DOMElements/LabeledInput/LabeledInput";

class Transaction extends Component {
  render() {
    return (
      <div>
        <h2>Do I Look Like a Transaction?</h2>
        <LabeledInput label="Date:" placeholder="yyyy/mm/dd" />
        <LabeledInput label="Amount:" placeholder="16.78" />
      </div>);
  }
}

export default Transaction;
