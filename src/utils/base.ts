export function initializeFoundation(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.id = 'foundation';
  canvas.height = document.querySelector('body').clientHeight - 100;
  canvas.width = canvas.height;

  const wrapper = document.createElement('div');
  wrapper.id = 'wrapper';
  wrapper.appendChild(canvas);

  const container = document.createElement('div');
  container.id = 'container';
  container.appendChild(wrapper);

  document.querySelector('body').appendChild(container);

  return canvas;
}
