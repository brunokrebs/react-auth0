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
    this.selectElement = selectElement.bind(this);
    this.updateSize = updateSize.bind(this);
    this.addRectangles = addRectangles.bind(this);
    this.addCircle = addCircle.bind(this);
    this.addAuth0 = addAuth0.bind(this);
    this.saveDiagram = saveDiagram.bind(this);
    this.updateElementLocation = updateElementLocation.bind(this);
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
        <Button className='margin-bottom' onClick={this.addRectangles} text='+ Square' />
        <Button className='margin-bottom' onClick={this.addCircle} text='+ Circle' />
        <Button className='margin-bottom' onClick={this.addAuth0} text='+ Auth0' />
        <Canvas>
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

function selectElement(event) {
  this.selectedElement = event.target;
}

function updateSize(event) {
  this.setState({
    size: event.target.value
  });
}

function addRectangles() {
  const elements = this.state.elements;
  const elementId = generateElementId('rect');
  elements.push({
    props: {
      type: 'Rectangles',
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

function addCircle() {
  const elements = this.state.elements;
  const elementId = generateElementId('circle');
  elements.push({
    props: {
      type: 'Circles',
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

function addAuth0() {
  const elements = this.state.elements;
  const elementId = generateElementId('auth0');
  elements.push({
    props: {
      type: 'Auth0Logo',
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
