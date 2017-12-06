import React, {Component} from 'react';
import Panel from "../DOMElements/Panel/Panel";
import LabeledInput from "../DOMElements/LabeledInput/LabeledInput";
import Button from "../DOMElements/Button/Button";
import '../DOMElements/Margin/Margin.css';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {
        name: 'Bruno',
        phone: ''
      }
    };
    this.handleNameChange.bind(this);
    this.handlePhoneChange.bind(this);
    this.onClick.bind(this);
  }

  onClick(event) {
    console.log(this);
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
                      value={this.state.contact.name} onChange={(evt) => {this.handleNameChange(evt)}}/>

        <LabeledInput label="Phone:" placeholder="+55 51 982234343"
                      value={this.state.contact.phone} onChange={(evt) => {this.handlePhoneChange(evt)}}/>
        <Button onClick={(evt) => {this.onClick(evt)}} text="Save" className='margin-top' />
      </Panel>
    );
  }
}

export default Contact;
