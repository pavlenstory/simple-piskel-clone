export function loadCanvas() {
  const ctx = document.querySelector('canvas').getContext('2d');
  const dataURL = localStorage.getItem('canvas');
  const img = new Image();
  img.src = dataURL;
  img.onload = function canvasLoading() {
    ctx.drawImage(img, 0, 0);
  };
}
