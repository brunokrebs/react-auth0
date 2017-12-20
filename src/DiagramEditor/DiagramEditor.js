import React, {Component} from 'react';
import Canvas from "../Charts/Canvas";
import Panel from "../DOMElements/Panel/Panel";
import LabeledInput from '../DOMElements/LabeledInput/LabeledInput';

class DiagramEditor extends Component {
  selectedElement;

  constructor(props) {
    super(props);
    this.selectElement = this.selectElement.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.state = {
      elements: [],
      size: 0
    }
  }

  selectElement(event) {
    this.selectedElement = event.target;
  }

  updateSize(event) {
    this.setState({
      size: event.target.value
    });
  }

  render() {
    return (
      <Panel>
        <Canvas />
        <LabeledInput label='Size' placeholder='20'
                      value={this.state.size} onChange={(event) => (this.updateSize(event))} />
      </Panel>
    );
  }
}

export default DiagramEditor;
