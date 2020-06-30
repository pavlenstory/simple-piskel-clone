import * as firebase from 'firebase/app';
import {
  TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PENCIL, TOOL_BRUSH, TOOL_ERASER,
} from './tool';
import Paint from './paint.class';
import 'firebase/auth';
import 'firebase/firestore';
import '../css/style.css';
import { loadCanvas } from './loadCanvas';
import { config } from "./googleIn";

firebase.initializeApp(config);


document.querySelector('.googleSign').addEventListener('click',
  () => {
    const baseProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(baseProvider).then((result) => {
      console.log(result);
      console.log('Success');
    }).catch((err) => {
      console.log(err);
      console.log('Failed to do');
    });
  });


const paint = new Paint('canvas');
paint.lineWidth = 1;
paint.brushSize = 6;
paint.activeTool = TOOL_LINE;
paint.selectedColor = '#000000';
paint.init();

document.querySelectorAll('[data-command').forEach(
  (item) => {
    item.addEventListener('click', () => {
      const command = item.getAttribute('data-command');
      if (command === 'undo') {
        paint.undoPaint();
      } else if (command === 'download') {
        const canvasSaved = document.getElementById('canvas');
        const imageForSaved = canvasSaved.toDataURL('image/png', 1.0).replace('image/png', 'image/octet-stream');
        const linkForSaved = document.createElement('a');
        linkForSaved.download = 'my-image.png';
        linkForSaved.href = imageForSaved;
        linkForSaved.click();
      }
    });
  },
);

document.querySelectorAll('[data-tool]').forEach(
  (item) => {
    item.addEventListener('click', () => {
      document.querySelector('[data-tool].active').classList.toggle('active');
      item.classList.toggle('active');
      const selectedTool = item.getAttribute('data-tool');
      paint.activeTool = selectedTool;
      localStorage.setItem('choice', selectedTool);

      switch (selectedTool) {
        case TOOL_LINE:
        case TOOL_RECTANGLE:
        case TOOL_CIRCLE:
        case TOOL_TRIANGLE:
        case TOOL_PENCIL:
          document.querySelector('.group.forShapes').style.display = 'block';
          document.querySelector('.group.forBrush').style.display = 'none';
          break;
        case TOOL_BRUSH:
        case TOOL_ERASER:
          document.querySelector('.group.forBrush').style.display = 'block';
          document.querySelector('.group.forShapes').style.display = 'none';
          break;
        default:
          document.querySelector('.group.forShapes').style.display = 'none';
          document.querySelector('.group.forBrush').style.display = 'none';
      }
    });
  },
);

document.querySelectorAll('[data-line-width]').forEach(
  (item) => {
    item.addEventListener('click', () => {
      document.querySelector('[data-line-width].active').classList.toggle('active');
      item.classList.toggle('active');
      const linewidth = item.getAttribute('data-line-width');
      paint.lineWidth = linewidth;

    });
  },
);

document.querySelectorAll('[data-brush-size]').forEach(
  (item) => {
    item.addEventListener('click', () => {
      document.querySelector('[data-brush-size].active').classList.toggle('active');
      item.classList.toggle('active');
      const brushSize = item.getAttribute('data-brush-size');
      paint.brushSize = brushSize;
    });
  },
);

document.querySelectorAll('[data-color]').forEach(
  (item) => {
    item.addEventListener('click', () => {
      document.querySelector('[data-color].active').classList.toggle('active');
      item.classList.toggle('active');
      const color = item.getAttribute('data-color');
      paint.selectedColor = color;
      localStorage.setItem('colorChoice', color);

    });
  },
);
loadCanvas();

function choiceElement() {
  if (localStorage.getItem !== null) {
    const idChoice = localStorage.getItem('choice');
    const selectedTool = document.querySelector(`#${idChoice}`);
    selectedTool.classList.add('active');
    document.querySelector('[data-tool].active').classList.toggle('active');
    paint.activeTool = idChoice;
  }
}
choiceElement();

