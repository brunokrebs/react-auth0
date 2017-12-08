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
    event.target = applyMask(this.props.type, event.target);
    this.setState({value: event.target.value});
    this.props && this.props.onChange(event);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value || ''
    });
  }

  render() {
    return (
      <input
        className='react-auth0 shadow-lighter default-font-size'
        value={this.state.value}
        onChange={this.onChange}
        placeholder={this.props.placeholder}/>
    )
  }
}

export default Input;

function applyMask(type, target) {
  switch (type) {
    case 'currency':
      target.value = maskCurrency(target.value);
      break;
    case 'date':
      target.value = maskJs('9999/99/99', target.value);
      break;
    case 'phone':
      target.value = maskJs('(99) 9999?9-9999', target.value);
      break;
  }
  return target;
}
