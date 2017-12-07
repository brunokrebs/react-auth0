import React, {Component} from 'react';
import Panel from "../DOMElements/Panel/Panel";
import LabeledInput from "../DOMElements/LabeledInput/LabeledInput";
import Button from "../DOMElements/Button/Button";
import '../DOMElements/Margin/Margin.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Transaction extends Component {
  constructor(props) {
    super(props);
    let {transactionId} = this.props.match.params;
    this.state = {
      transactionId,
      transaction: {
        date: '',
        description: '',
        amount: 0
      }
    };
    this.handleChange = handleChange.bind(this);
    this.onClick = onClick.bind(this);
    this.componentDidMount = componentDidMount.bind(this);
  }

  render() {
    return (
      <Panel>
        <h2>Transaction Form</h2>
        <LabeledInput label="Date:" placeholder="yyyy/mm/dd"
                      value={this.state.transaction.date} onChange={this.handleChange('date')}/>

        <LabeledInput label="Description:" placeholder="Happy Hour!"
                      value={this.state.transaction.description} onChange={this.handleChange('description')}/>

        <LabeledInput label="Amount:" placeholder="someone@somewhere.com" type="currency"
                      value={this.state.transaction.amount} onChange={this.handleChange('amount')}/>

        <Button onClick={() => (this.onClick())} text="Save" className='margin-top'/>
      </Panel>
    );
  }
}

export default withRouter(props => <Transaction {...props}/>);

function componentDidMount() {
  const self = this;
  const {transactionId} = this.state;

  // loading transaction details
  if (transactionId !== 'new') {
    const config = {
      url: process.env.REACT_APP_FLEX_REST + '/transactions/' + transactionId,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
    };
    axios(config).then(function (response) {
      self.setState({transaction: response.data});
    }).catch(console.log);
  }
}

function onClick() {
  const self = this;
  const transactionId = self.state.transactionId === 'new' ? '' : self.state.transactionId;
  const config = {
    method: transactionId ? 'put' : 'post',
    url: process.env.REACT_APP_FLEX_REST + '/transactions/' + transactionId,
    data: this.state.transaction,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
  };
  axios(config).then(function () {
    self.props.history.push('/transactions');
  }).catch(console.log);
}

function handleChange(property) {
  return (event) => {
    this.setState({
      transaction: {
        ...this.state.transaction,
        [property]: event.target.value
      }
    });
  }
}

