import Point from './point.module';

export function getMouseCoordsOnCanvas(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);
  return new Point(x, y);
}
