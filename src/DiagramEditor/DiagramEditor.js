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
    this.addShape = addShape.bind(this);
    this.saveDiagram = saveDiagram.bind(this);
    this.updateElementLocation = updateElementLocation.bind(this);
    this.onMouseDown = onMouseDown.bind(this);
    this.onMouseUp = onMouseUp.bind(this);
    this.onMouseMove = onMouseMove.bind(this);
    this.state = {
      elements: [],
      size: 0
    }
  }

  render() {
    const components = {
      'Auth0Logo': Auth0Logo,
      'Circles': Circles,
      'Rectangles': Rectangles
    };
    return (
      <Panel>
        <Button className='margin-bottom' onClick={() => (this.addShape('Rectangles'))} text='+ Square' />
        <Button className='margin-bottom' onClick={() => (this.addShape('Circles'))} text='+ Circle' />
        <Button className='margin-bottom' onClick={() => (this.addShape('Auth0Logo'))} text='+ Auth0' />
        <Canvas onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove}>
          {this.state.elements.map(element => {
            const Component = components[element.props.type];
            return <Component {...element.props} />
          })}
        </Canvas>
        <Button className='margin-bottom' onClick={this.saveDiagram} text='Save' />
      </Panel>
    );
  }
}

export default DiagramEditor;

function addShape(shape) {
  const elements = this.state.elements;
  const elementId = generateElementId(shape);
  elements.push({
    props: {
      type: shape,
      elementId: elementId,
      key: elementId,
      updateElementLocation: this.updateElementLocation,
      matrix: [1, 0, 0, 1, 0, 0]
    }
  });
  this.setState({
    elements
  });
}

function onMouseDown(event) {
  console.log('onMouseDown');
  console.log(event);
  this.elementSelected = true;
}

function onMouseUp(event) {
  console.log('onMouseUp');
  console.log(event);
  this.elementSelected = false;
}

function onMouseMove(event) {
  if (!this.elementSelected) return;
  console.log('onMouseMove');
  console.log(event.target);
}

function saveDiagram() {
  console.log(this.state.elements);
}

function generateElementId(elementType) {
  const time = (new Date()).getTime();
  return `${elementType}-${time}`;
}

function updateElementLocation(elementBeingDragged) {
  const elements = this.state.elements.filter(element => (element.props.elementId !== elementBeingDragged.props.elementId));
  elements.push({
    props: {
      type: elementBeingDragged.props.type,
      elementId: elementBeingDragged.props.elementId,
      key: elementBeingDragged.props.elementId,
      updateElementLocation: this.updateElementLocation,
      matrix: elementBeingDragged.props.matrix
    }
  });
  this.setState({
    elements: elements
  });
}
