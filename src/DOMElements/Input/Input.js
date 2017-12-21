import React, {Component} from 'react';
import './Input.css';
import '../Shadow/Shadow.css';
import {maskJs, maskCurrency} from 'mask-js';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const value = convertToObject(this.props.type, event.target.value);
    this.setState({value});
    this.props && this.props.onChange(value);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: convertToObject(nextProps.type, nextProps.value || '')
    });
  }

  render() {
    const maskedValue = applyMask(this.props.type, this.state.value);
    return (
      <input
        className='react-auth0 shadow-lighter default-font-size'
        value={maskedValue}
        onChange={this.onChange}
        placeholder={'e.g. ' + this.props.placeholder}/>
    )
  }
}

export default Input;

function applyMask(type, value) {
  switch (type) {
    case 'currency':
      value = maskCurrency(value.toString());
      break;
    case 'date':
      const isDateObject = value.toISOString;
      if (isDateObject) {
        const length = value.length >= 10 ? 10 : value.length;
        value = maskJs('9999/99/99', value.toISOString().slice(0,length).replace(/-/g,""));
      } else {
        value = maskJs('9999/99/99', value);
      }
      break;
    case 'phone':
      value = maskJs('(99) 9999?9-9999', value);
      break;
  }
  return value;
}

function convertToObject(type, value) {
  switch (type) {
    case 'currency':
      value = Number(value.toString().replace(/\D/g,''));
      break;
    case 'date':
      if (value.length === 10) {
        const parts = value.split('/');
        value = new Date(Number(parts[0]), Number(parts[1] - 1), Number(parts[2]));
      }
      break;
    case 'phone':
      value = value.replace(/\D/g,'');
      break;
  }
  return value;
}
