import React, {Component} from 'react';
import Panel from '../DOMElements/Panel/Panel';
import Table from '../DOMElements/Table/Table';
import {withRouter} from 'react-router-dom';
import Link from '../DOMElements/Link/Link';
import {editEntity, loadEntityList, removeEntity} from '../RestFlex/RestFlex';
import Button from "../DOMElements/Button/Button";
import * as Auth0 from 'auth0-web';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {transactions: []};
    this.loadTransactionsList = loadEntityList('transactions').bind(this);
    this.editTransaction = editEntity('transactions').bind(this);
    this.removeTransaction = removeEntity('transactions', this.loadTransactionsList).bind(this);
    this.componentDidMount = this.loadTransactionsList;
  }

  requestGrants() {
    Auth0.auth0Client.checkSession({
      audience: 'https://transactions.digituz.com.br/',
    }, function (err, authResult) {
      console.log(err);
      console.log(authResult);
    });
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
        <Button onClick={this.requestGrants} text='Request more grants' />
      </Panel>
    );
  }
}

export default withRouter(props => <Transactions {...props} />);
