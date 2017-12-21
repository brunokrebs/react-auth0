import React, {Component} from 'react';
import Canvas from "../Charts/Canvas";
import Panel from "../DOMElements/Panel/Panel";
import Button from "../DOMElements/Button/Button";
import Rectangles from "../Charts/Rectangles/Rectangles";
import Circles from "../Charts/Circles/Circles";
import Auth0Logo from "../Charts/Auth0/Auth0Logo";
import LabeledInput from "../DOMElements/LabeledInput/LabeledInput";
import axios from "axios";
import {getRestFlexUrl} from "../RestFlex/RestFlex";
import * as Auth0 from "auth0-web";

class DiagramEditor extends Component {
  constructor(props) {
    super(props);

    // binding this to functions
    this.addShape = addShape.bind(this);
    this.saveDiagram = saveDiagram.bind(this);
    this.onMouseDown = onMouseDown.bind(this);
    this.onMouseUp = onMouseUp.bind(this);
    this.updateElementLocation = updateElementLocation.bind(this);
    this.onMouseMove = onMouseMove.bind(this);
    this.updateDiagramTitle = updateDiagramTitle.bind(this);

    // defining diagram object
    const initialDiagram = {
      title: '',
      elements: []
    };
    let {diagramId} = this.props.match.params;
    diagramId !== 'new' && (initialDiagram._id = diagramId);

    this.state = {
      diagram: initialDiagram
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
        <LabeledInput label='Diagram Name' placeholder='My Beautiful Diagram'
                      onChange={this.updateDiagramTitle} value={this.state.diagram.title} />

        <Button className='margin-bottom' onClick={() => (this.addShape('Rectangles'))} text='+ Square'/>
        <Button className='margin-bottom' onClick={() => (this.addShape('Circles'))} text='+ Circle'/>
        <Button className='margin-bottom' onClick={() => (this.addShape('Auth0Logo'))} text='+ Auth0'/>

        <Canvas onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove}>
          {this.state.diagram.elements.map(element => {
            const Component = components[element.props.type];
            return <Component {...element.props} key={element.elementId} />
          })}
        </Canvas>
        <Button className='margin-bottom' onClick={this.saveDiagram} text='Save'/>
      </Panel>
    );
  }
}

export default DiagramEditor;

function addShape(shape) {
  const elements = this.state.diagram.elements;
  const elementId = generateElementId(shape);
  elements.push({
    props: {
      type: shape,
      elementId: elementId,
      matrix: [1, 0, 0, 1, 0, 0]
    }
  });
  this.setState({
    diagram: {
      ...this.state.diagram,
      elements
    }
  });
}

function onMouseDown(event) {
  if (this.elementSelected ||
    event.target.tagName === 'svg' ||
    !event.target.getAttribute('matrix')) {
    return;
  }
  const matrix = event.target.getAttribute('matrix').split(',');
  const type = event.target.getAttribute('type');
  this.currentX = event.clientX;
  this.currentY = event.clientY;
  this.elementSelected = {
    elementId: event.target.id,
    type: type,
    matrix: matrix
  };
}

function onMouseMove(event) {
  if (!this.elementSelected) {
    return;
  }
  const dx = event.clientX - this.currentX;
  const dy = event.clientY - this.currentY;
  const newMatrix = this.elementSelected.matrix;

  newMatrix[4] = parseInt(newMatrix[4]) + dx;
  newMatrix[5] = parseInt(newMatrix[5]) + dy;

  this.currentX = event.clientX;
  this.currentY = event.clientY;

  this.updateElementLocation(newMatrix);
}

function onMouseUp() {
  this.elementSelected = null;
}

function updateElementLocation(newMatrix) {
  if (!this.elementSelected) return;
  const {elementId, type} = this.elementSelected;
  const elements = this.state.diagram.elements.filter(element => (element.elementId !== elementId));
  elements.push({
    type: type,
    elementId: elementId,
    matrix: newMatrix
  });
  this.setState({
    diagram: {
      ...this.state.diagram,
      elements
    }
  });
}


async function saveDiagram() {
  const diagram = this.state.diagram;
  const entity = 'diagrams';

  // guarantees that no null is passed as _id
  !diagram._id && delete diagram._id;

  const restFlexUrl = getRestFlexUrl(entity);
  const config = {
    method: diagram._id ? 'put' : 'post',
    url: `${restFlexUrl}/${diagram._id || ''}`,
    data: diagram,
    headers: {'Authorization': 'Bearer ' + Auth0.getExtraToken(entity)}
  };
  return await axios(config);
}

function generateElementId(elementType) {
  const time = (new Date()).getTime();
  return `${elementType}-${time}`;
}

function updateDiagramTitle(title) {
  const diagram = this.state.diagram;
  this.setState({
    state: {
      ...diagram,
      title
    }
  });
}

async function componentDidMount() {
  const _id = this.state.diagram._id;
  if (_id) {
    const entity = 'diagrams';
    const restFlexUrl = getRestFlexUrl(entity);
    const config = {
      url: `${restFlexUrl}/${_id}`,
      headers: {'Authorization': 'Bearer ' + Auth0.getExtraToken(entity)}
    };
    const response = await axios(config);
    this.setState({
      diagram: response.data
    })
  }
}
