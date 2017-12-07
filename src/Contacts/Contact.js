import React, {Component} from 'react';
import Panel from "../DOMElements/Panel/Panel";
import LabeledInput from "../DOMElements/LabeledInput/LabeledInput";
import Button from "../DOMElements/Button/Button";
import '../DOMElements/Margin/Margin.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Contact extends Component {
  constructor(props) {
    super(props);
    let {contactId} = this.props.match.params;
    this.state = {
      contactId,
      contact: {
        name: '',
        phone: ''
      }
    };
    this.handleChange.bind(this);
    this.onClick.bind(this);
  }

  componentDidMount = componentDidMount;
  onClick = onClick;
  handleChange = handleChange;

  render() {
    return (
      <Panel>
        <h2>Contact Form</h2>
        <LabeledInput label="Name:" placeholder="Contact Name"
                      value={this.state.contact.name} onChange={this.handleChange('name')}/>

        <LabeledInput label="Phone:" placeholder="+55 51 982234343"
                      value={this.state.contact.phone} onChange={this.handleChange('phone')}/>

        <LabeledInput label="Email:" placeholder="someone@somewhere.com"
                      value={this.state.contact.email} onChange={this.handleChange('email')}/>

        <LabeledInput label="Heritage:" placeholder="50,00" type='currency'
                      value={this.state.contact.heritage} onChange={this.handleChange('heritage')}/>
        <Button onClick={() => (this.onClick())} text="Save" className='margin-top'/>
      </Panel>
    );
  }
}

export default withRouter(props => <Contact {...props}/>);

function componentDidMount() {
  const self = this;
  const {contactId} = this.state;

  // loading contact details
  if (contactId !== 'new') {
    const config = {
      url: process.env.REACT_APP_FLEX_REST + '/contacts/' + contactId,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
    };
    axios(config).then(function (response) {
      self.setState({contact: response.data});
    }).catch(console.log);
  }
}

function onClick() {
  const self = this;
  const contactId = self.state.contactId === 'new' ? '' : self.state.contactId;
  const config = {
    method: contactId ? 'put' : 'post',
    url: process.env.REACT_APP_FLEX_REST + '/contacts/' + contactId,
    data: this.state.contact,
    headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
  };
  axios(config).then(function () {
    self.props.history.push('/contacts');
  }).catch(console.log);
}

function handleChange(property) {
  return (event) => {
    this.setState({
      contact: {
        ...this.state.contact,
        [property]: event.target.value
      }
    });
  }
}
