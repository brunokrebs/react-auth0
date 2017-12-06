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
    this.handleNameChange.bind(this);
    this.handlePhoneChange.bind(this);
    this.onClick.bind(this);
  }

  componentDidMount() {
    const self = this;
    const {contactId} = this.state;

    // loading contact details
    if (contactId !== 'new') {
      const config = {
        url: 'http://auth0-wildcard.digituz.com.br/contacts/' + contactId,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
      };
      axios(config).then(function (response) {
        self.setState({contact: response.data});
      }).catch(console.log);
    }
  }

  onClick() {
    const self = this;
    const config = {
      method: 'post',
      url: 'http://auth0-wildcard.digituz.com.br/contacts/',
      data: this.state.contact,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
    };
    axios(config).then(function () {
      self.props.history.push('/contacts');
    }).catch(console.log);
  }

  handleNameChange(event) {
    this.setState({
      contact: {
        ...this.state.contact,
        name: event.target.value
      }
    });
  }

  handlePhoneChange(event) {
    this.setState({
      contact: {
        ...this.state.contact,
        phone: event.target.value
      }
    });
  }

  render() {
    return (
      <Panel>
        <h2>Contact Form</h2>
        <LabeledInput label="Name:" placeholder="Contact Name"
                      value={this.state.contact.name} onChange={(evt) => (this.handleNameChange(evt))}/>

        <LabeledInput label="Phone:" placeholder="+55 51 982234343"
                      value={this.state.contact.phone} onChange={(evt) => (this.handlePhoneChange(evt))}/>
        <Button onClick={() => (this.onClick())} text="Save" className='margin-top'/>
      </Panel>
    );
  }
}

export default withRouter(props => <Contact {...props}/>);
