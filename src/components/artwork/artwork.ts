import { generateGrid, GridElement } from 'utils/gird';
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';

function lockState(target: Artwork, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  // eslint-disable-next-line no-param-reassign
  descriptor.value = function f(...args) {
    const self = this as Artwork;

    self.ctx.save();
    const result = originalMethod.apply(this, args);
    self.ctx.restore();

    return result;
  };

  return descriptor;
}

class Artwork {
  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  height: number;

  width: number;

  grid: GridElement[];

  palette: string[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.height = canvas.height;
    this.width = canvas.width;

    this.grid = generateGrid({
      count: 40,
      padding: 0.06
    });

    this.palette = random.pick(palettes);
  }

  cleanUp(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  @lockState
  paintBackground(): void {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  @lockState
  paintElement({ u, v, timestamp }: { u: number; v: number; timestamp?: number }): void {
    const noise = Math.abs(random.noise2D(u, v, Math.sin(timestamp * 0.00009)));

    this.ctx.fillStyle = random.pick(this.palette);
    this.ctx.font = `${Math.max(4, Math.round(26 * noise))}px "Ariel"`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.translate(u * this.width, v * this.height);
    this.ctx.rotate(Math.PI * noise * 2);
    this.ctx.fillText('↠', 0, 0);
  }

  render(seed: number, timestamp?: number): void {
    random.setSeed(seed);

    this.cleanUp();
    this.paintBackground();

    this.grid
      .filter(() => Math.abs(random.gaussian()) > 0.1)
      .forEach((gridElement: GridElement) => {
        this.paintElement({
          u: gridElement.u,
          v: gridElement.v,
          timestamp
        });
      });
  }
}

export default Artwork;
