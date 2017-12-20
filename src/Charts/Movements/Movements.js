function selectElement(event) {
  this.currentX = event.clientX;
  this.currentY = event.clientY;
  this.moving = true;
}

function moveElement(event) {
  if (!this.moving) {
    return;
  }
  const dx = event.clientX - this.currentX;
  const dy = event.clientY - this.currentY;
  const newMatrix = this.state.matrix;
  newMatrix[4] += dx;
  newMatrix[5] += dy;

  this.setState({
    matrix: newMatrix
  });

  this.currentX = event.clientX;
  this.currentY = event.clientY;
}

function releaseElement() {
  this.currentX = 0;
  this.currentY = 0;
  this.moving = false;
}

export {
  selectElement, moveElement, releaseElement
}
