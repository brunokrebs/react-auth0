import React, {Component} from 'react';
import Canvas from "../Charts/Canvas";
import Panel from "../DOMElements/Panel/Panel";
import LabeledInput from '../DOMElements/LabeledInput/LabeledInput';
import Button from "../DOMElements/Button/Button";
import Rectangles from "../Charts/Rectangles/Rectangles";
import Circles from "../Charts/Circles/Circles";
import Auth0Logo from "../Charts/Auth0/Auth0Logo";

class DiagramEditor extends Component {
  selectedElement;

  constructor(props) {
    super(props);
    this.selectElement = this.selectElement.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.addRectangles = this.addRectangles.bind(this);
    this.addCircle = this.addCircle.bind(this);
    this.addAuth0 = this.addAuth0.bind(this);
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

  addRectangles() {
    const elements = this.state.elements;
    elements.push(
      <Rectangles />
    );
    this.setState({
      elements
    });
  }

  addCircle() {
    const elements = this.state.elements;
    elements.push(
      <Circles />
    );
    this.setState({
      elements
    });
  }

  addAuth0() {
    const elements = this.state.elements;
    elements.push(
      <Auth0Logo />
    );
    this.setState({
      elements
    });
  }

  render() {
    return (
      <Panel>
        <Button className='margin-bottom' onClick={this.addRectangles} text='+ Square' />
        <Button className='margin-bottom' onClick={this.addCircle} text='+ Circle' />
        <Button className='margin-bottom' onClick={this.addAuth0} text='+ Auth0' />
        <Canvas>
          {this.state.elements}
        </Canvas>
        <LabeledInput label='Size' placeholder='20'
                      value={this.state.size} onChange={(event) => (this.updateSize(event))} />
      </Panel>
    );
  }
}

export default DiagramEditor;
