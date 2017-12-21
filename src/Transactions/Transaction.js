import React, {Component} from 'react';
import '../DOMElements/Margin/Margin.css';
import EntityForm from '../EntityForm/EntityForm';
import {withRouter} from 'react-router-dom';

class Transaction extends Component {
  constructor(props) {
    super(props);
    let {transactionId} = this.props.match.params;
    const initialTransaction = {
      date: new Date(),
      description: '',
      amount: 0
    };
    transactionId !== 'new' && (initialTransaction._id = transactionId);
    this.state = {
      transaction: initialTransaction
    };
    this.refreshTransaction = this.refreshTransaction.bind(this);
  }

  refreshTransaction(transaction) {
    this.setState({transaction});
  }

  render() {
    const title = 'Transaction Form';
    const entityName = 'transactions';
    const inputs = [
      {field: 'date', label: 'Date', placeholder: '2018/01/01', type: 'date'},
      {field: 'description', label: 'Description', placeholder: 'Happy hour!', type: 'text'},
      {field: 'amount', label: 'Amount', placeholder: '21.42', type: 'currency'}
    ];

    return (
      <EntityForm entity={this.state.transaction} entityName={entityName}
                  title={title} refreshEntity={this.refreshTransaction}
                  inputs={inputs} />
    );
  }
}

export default withRouter(props => <Transaction {...props}/>);
