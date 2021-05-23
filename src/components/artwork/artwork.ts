function lockState(ctx: CanvasRenderingContext2D): (target: () => void) => void {
  function wrapper(target: () => void) {
    ctx.save();
    target();
    ctx.restore();
  }

  return wrapper;
}

class Artwork {
  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  height: number;

  width: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.height = canvas.height;
    this.width = canvas.width;
  }

  cleanUp(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  @lockState(this.ctx)
  paintBackground(): void {
    this.ctx.save();
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }

  render(timestamp: number): void {
    this.cleanUp();
    this.paintBackground();
  }
}

export default Artwork;
