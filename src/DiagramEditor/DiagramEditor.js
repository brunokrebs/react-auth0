import React, {Component} from 'react';
import Canvas from "../Charts/Canvas";
import Panel from "../DOMElements/Panel/Panel";
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
    this.saveDiagram = this.saveDiagram.bind(this);
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
    const elementId = DiagramEditor.generateElementId('rect');
    elements.push(
      <Rectangles elementId={elementId} key={elementId} />
    );
    this.setState({
      elements
    });
  }

  addCircle() {
    const elements = this.state.elements;
    const elementId = DiagramEditor.generateElementId('circle');
    elements.push(
      <Circles elementId={elementId} key={elementId} />
    );
    this.setState({
      elements
    });
  }

  addAuth0() {
    const elements = this.state.elements;
    const elementId = DiagramEditor.generateElementId('auth0');
    elements.push(
      <Auth0Logo elementId={elementId} key={elementId} />
    );
    this.setState({
      elements
    });
  }

  saveDiagram() {
    console.log(this.state.elements);
  }

  static generateElementId(elementType) {
    const time = (new Date()).getTime();
    return `${elementType}-${time}`;
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
        <Button className='margin-bottom' onClick={this.saveDiagram} text='Save' />
      </Panel>
    );
  }
}

export default DiagramEditor;
