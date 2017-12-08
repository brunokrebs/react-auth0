import React, {Component} from 'react';
import Panel from "../DOMElements/Panel/Panel";
import LabeledInput from "../DOMElements/LabeledInput/LabeledInput";
import Button from "../DOMElements/Button/Button";
import '../DOMElements/Margin/Margin.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EntityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entityName: this.props.entityName,
      entityData: this.props.entity
    };
    this.handleChange = handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.componentDidMount = componentDidMount.bind(this);
  }

  onClick() {
    onClick(this.state.entityName, this.state.entityData);
    this.props.history.push(`/${this.state.entityName}`);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      entityData: nextProps.entity || {}
    });
  }

  render() {
    return (
      <Panel>
        <h2>{this.props.title}</h2>
        {this.props.inputs.map(input => (
          <LabeledInput label={input.label} placeholder={input.placeholder} type={input.type}
                        value={this.state.entityData[input.field]} onChange={this.handleChange(input.field)}
                        field={input.field} key={input.field}/>
        ))}
        <Button onClick={() => (this.onClick())} text="Save" className='margin-top'/>
      </Panel>
    );
  }
}

export default withRouter(props => <EntityForm {...props}/>);

async function componentDidMount() {
  const _id = this.state.entityData._id;
  if (_id) {
    const config = {
      url: `${process.env.REACT_APP_FLEX_REST}/${this.props.entityName}/${_id}`,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
    };
    const response = await axios(config);
    this.props.refreshEntity(response.data);
  }
}

async function onClick(entityName, entity) {
  if (entity.hasOwnProperty('_id') && entity._id === null) {
    delete entity._id;
  }
  const config = {
    method: entity._id ? 'put' : 'post',
    url: `${process.env.REACT_APP_FLEX_REST}/${entityName}/${entity._id || ''}`,
    data: entity,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
  };
  return await axios(config);
}

function handleChange(property) {
  return (event) => {
    this.setState({
      entityData: {
        ...this.state.entityData,
        [property]: event.target.value
      }
    });
  }
}
