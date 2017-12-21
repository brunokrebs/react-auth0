import React, {Component} from 'react';
import Panel from '../DOMElements/Panel/Panel';
import Table from '../DOMElements/Table/Table';
import {withRouter} from 'react-router-dom';
import Link from '../DOMElements/Link/Link';
import {editEntity, loadEntityList, removeEntity} from '../RestFlex/RestFlex';

class Diagrams extends Component {
  constructor(props) {
    super(props);
    this.state = {diagrams: []};
    this.loadDiagramsList = loadEntityList('diagrams', 'https://diagrams.digituz.com.br/',
      'get:diagrams post:diagrams put:diagrams delete:diagrams').bind(this);
    this.editDiagram = editEntity('diagrams').bind(this);
    this.removeDiagram = removeEntity('diagrams', this.loadDiagramsList).bind(this);
    this.componentDidMount = this.loadDiagramsList;
  }

  render() {
    const headers = [
      {key: 'name', text: 'Name'}
    ];
    const rows = this.state.diagrams;
    return (
      <Panel>
        <h2>List of Diagrams</h2>
        <Table headers={headers} rows={rows} onEditClick={this.editDiagram} onRemoveClick={this.removeDiagram}/>
        <Link to='/diagrams/new' text='Create Diagram'/>
      </Panel>
    );
  }
}

export default withRouter(props => <Diagrams {...props} />);
