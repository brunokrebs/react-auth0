import React, {Component} from 'react';
import Panel from '../DOMElements/Panel/Panel';
import Table from '../DOMElements/Table/Table';
import {withRouter} from 'react-router-dom';
import Link from '../DOMElements/Link/Link';
import {editEntity, loadEntityList, removeEntity} from '../RestFlex/RestFlex';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {transactions: []};
    this.loadTransactionsList = loadEntityList('transactions').bind(this);
    this.editTransaction = editEntity('transactions').bind(this);
    this.removeTransaction = removeEntity('transactions', this.loadTransactionsList).bind(this);
    this.componentDidMount = this.loadTransactionsList;
  }

  render() {
    const headers = [
      {key: 'date', text: 'Date'},
      {key: 'description', text: 'Description'},
      {key: 'amount', text: 'Amount'}
    ];
    const rows = this.state.transactions;
    return (
      <Panel>
        <h2>List of Transactions</h2>
        <Table headers={headers} rows={rows} onEditClick={this.editTransaction} onRemoveClick={this.removeTransaction}/>
        <Link to='/transactions/new' text='Create Transaction'/>
      </Panel>
    );
  }
}

export default withRouter(props => <Transactions {...props} />);