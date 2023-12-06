import { EventEmitter } from '@jsmini/event';
import { Shape } from './shape';

export interface CanvasOption {
  backgroundColor?: string;
  devicePixelRatio?: number;
}
export class Canvas extends EventEmitter {
  private ctx: CanvasRenderingContext2D;
  private shapes: Shape[] = [];
  private width: number;
  private height: number;
  private option!: CanvasOption;

  constructor(
    public canvas: HTMLCanvasElement,
    option?: CanvasOption,
  ) {
    super();
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;
    this.set(option);
  }
  private setdpr() {
    const { devicePixelRatio } = this.option;
    if (devicePixelRatio && devicePixelRatio > 1) {
      const { width, height } = this.canvas.getBoundingClientRect();
      this.canvas.width = width * devicePixelRatio;
      this.canvas.height = height * devicePixelRatio;
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
      this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }
  }
  public set(option?: CanvasOption) {
    this.option = { ...this.option, ...option };
    this.setdpr();
  }
  public setWidth(width: number) {
    this.width = width;
    this.canvas.width = width;
    this.setdpr();
  }
  public setHeight(height: number) {
    this.height = height;
    this.canvas.height = height;
    this.setdpr();
  }
  public add(shape: Shape) {
    this.shapes.push(shape);
  }
  public remove(shape: Shape) {
    const index = this.shapes.indexOf(shape);
    if (index !== -1) {
      this.shapes.splice(index, 1);
    }
  }
  private clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  public render() {
    this.clear();

    if (this.option?.backgroundColor) {
      this.ctx.fillStyle = this.option.backgroundColor;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

    this.shapes.forEach((shape) => {
      if (shape instanceof Shape) {
        shape.render(this.ctx);
      }
    });
  }
}
