import React, {Component} from 'react';
import './Input.css';
import '../Shadow/Shadow.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    if (!this.props.onChange) {
      return this.setState({value: event.target.value});
    }
    this.props.onChange(event);
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
