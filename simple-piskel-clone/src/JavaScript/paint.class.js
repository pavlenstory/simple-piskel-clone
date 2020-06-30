import {
  TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE,
  TOOL_PAINT_BUCKET, TOOL_PENCIL, TOOL_BRUSH, TOOL_ERASER,
} from './tool';
import { getMouseCoordsOnCanvas } from './utility';
import { findDistance } from './utility.findDistance';
import Fill from './fill.class';

const canv = document.querySelector('canvas');

export default class Paint {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.undoStack = [];
    this.undoLimit = 5;
  }

  set activeTool(tool) {
    this.tool = tool;
  }

  set lineWidth(linewidth) {
    this.LineWidth = linewidth;
    this.context.lineWidth = this.LineWidth;
  }

  set brushSize(brushsize) {
    this.BrushSize = brushsize;
  }

  set selectedColor(color) {
    this.color = color;
    this.context.strokeStyle = this.color;
  }

  init() {
    this.canvas.onmousedown = (e) => this.onMouseDown(e);
  }

  onMouseDown(e) {
    this.savedData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.height);

    if (this.undoStack.length >= this.undoLimit) this.undoStack.shift();
    this.undoStack.push(this.savedData);

    this.canvas.onmousemove = (e) => this.onMouseMove(e);
    document.onmouseup = (e) => this.onMouseUp(e);

    this.startPos = getMouseCoordsOnCanvas(e, this.canvas);

    if (this.tool === TOOL_PENCIL || this.tool === TOOL_BRUSH) {
      this.context.beginPath();
      this.context.moveTo(this.startPos.x, this.startPos.y);
    } else if (this.tool === TOOL_PAINT_BUCKET) {
      new Fill(this.canvas, this.startPos, this.color);
    } else if (this.tool === TOOL_ERASER) {
      this.context.clearRect(this.startPos.x, this.startPos.y, this.BrushSize, this.BrushSize);
    }
    localStorage.setItem('canvas', canv.toDataURL());
  }

  onMouseMove(e) {
    this.currentPos = getMouseCoordsOnCanvas(e, this.canvas);
    const X = this.currentPos.x;
    const Y = this.currentPos.y;
    const BS = this.BrushSize;
    switch (this.tool) {
      case TOOL_LINE:
      case TOOL_RECTANGLE:
      case TOOL_CIRCLE:
      case TOOL_TRIANGLE:
        this.drawShape();
        break;
      case TOOL_PENCIL:
        this.drawFreeLine(this.LineWidth);
        break;
      case TOOL_BRUSH:
        this.drawFreeLine(this.BrushSize);
        break;
      case TOOL_ERASER:
        this.context.clearRect(X, Y, BS, BS);
        break;
      default:
        break;
    }
    localStorage.setItem('canvas', canv.toDataURL());
  }

  onMouseUp() {
    this.canvas.onmousemove = null;
    document.onmouseup = null;
  }

  drawShape() {
    this.context.putImageData(this.savedData, 0, 0);
    this.context.beginPath();
    const xCurrent = this.currentPos.x;
    const yCurrent = this.currentPos.y;
    const xStart = this.startPos.x;
    const yStart = this.startPos.y;
    if (this.tool === TOOL_LINE) {
      this.context.moveTo(xStart, yStart);
      this.context.lineTo(xCurrent, yCurrent);
    } else if (this.tool === TOOL_RECTANGLE) {
      this.context.rect(xStart, yStart, xCurrent - xStart, yCurrent - yStart);
    } else if (this.tool === TOOL_CIRCLE) {
      const distance = findDistance(this.startPos, this.currentPos);
      this.context.arc(xStart, yStart, distance, 0, 2 * Math.PI, false);
    } else if (this.tool === TOOL_TRIANGLE) {
      this.context.moveTo(xStart + (xCurrent - xStart) / 2, yStart);
      this.context.lineTo(xStart, yCurrent);
      this.context.lineTo(xCurrent, yCurrent);
      this.context.closePath();
    }
    localStorage.setItem('canvas', canv.toDataURL());
    this.context.stroke();
  }

  drawFreeLine(lineWith) {
    this.context.lineWidth = lineWith;
    this.context.lineTo(this.currentPos.x, this.currentPos.y);
    this.context.stroke();
  }

  undoPaint() {
    if (this.undoStack.length > 0) {
      this.context.putImageData(this.undoStack[this.undoStack.length - 1], 0, 0);
      this.undoStack.pop();
    } else {
      alert('only 5 changes saved');
    }
  }
}
