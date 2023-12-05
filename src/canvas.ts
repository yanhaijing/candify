import { EventEmitter } from '@jsmini/event';
import { Shape } from './shape';

export class Canvas extends EventEmitter {
  private ctx: CanvasRenderingContext2D;
  private shapes: Shape[] = [];
  private width: number;
  private height: number;

  constructor(
    public canvas: HTMLCanvasElement,
    public options?: {
      backgroundColor?: string;
    },
  ) {
    super();
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;
  }
  public setWidth(width: number) {
    this.width = width;
    this.canvas.width = width;
  }
  public setHeight(height: number) {
    this.height = height;
    this.canvas.height = height;
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
    this.shapes.forEach((shape) => {
      if (shape instanceof Shape) {
        shape.render(this.ctx);
      }
    });
  }
}
