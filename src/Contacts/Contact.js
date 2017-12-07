import React, {Component} from 'react';
import '../DOMElements/Margin/Margin.css';
import {withRouter} from 'react-router-dom';
import EntityForm from '../EntityForm/EntityForm';

class Contact extends Component {
  constructor(props) {
    super(props);
    let {contactId} = this.props.match.params;
    this.state = {
      contact: {
        _id: (contactId === 'new' ? null : contactId),
        name: '',
        phone: ''
      }
    };
    this.refreshContact = this.refreshContact.bind(this);
  }

  refreshContact(contact) {
    this.setState({contact});
  }

  render() {
    const title = 'Contact Form';
    const entityName = 'contacts';
    const inputs = [
      {field: 'name', label: 'Name:', placeholder: 'Contact Name', type: 'text'},
      {field: 'phone', label: 'Phone:', placeholder: '+55 51 982234343', type: 'text'},
      {field: 'email', label: 'Email:', placeholder: 'someone@somewhere.com', type: 'text'},
      {field: 'heritage', label: 'Heritage:', placeholder: '50,00', type: 'currency'}
    ];

    return (
      <EntityForm entity={this.state.contact} entityName={entityName}
                  title={title} refreshEntity={this.refreshContact}
                  inputs={inputs} />
    );
  }
}

export default withRouter(props => <Contact {...props}/>);
