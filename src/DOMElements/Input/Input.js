import React, {Component} from 'react';
import './Input.css';
import '../BoxShadow/BoxShadow.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.value || ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (!this.props.handleChange) {
      return this.setState({value: event.target.value});
    }
    this.props.handleChange(event);
  }

  render() {
    return (
      <input
        className='react-auth0 box-shadow default-font-size'
        value={this.state.value}
        onChange={this.handleChange}
        placeholder={this.props.placeholder}/>
    )
  }
}

export default Input;
