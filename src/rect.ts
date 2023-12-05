import { Shape } from './shape';

export interface RectOption {
  x: number;
  y: number;
  width: number;
  height: number;
  angle?: number;
  originX?: number;
  originY?: number;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
}
export class Rect extends Shape {
  constructor(public option: RectOption) {
    super();
  }
  public set(option: Partial<RectOption>) {
    this.option = { ...this.option, ...option };
  }
  public render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle;
  }
}
