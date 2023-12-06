import { Shape } from './shape';

export interface RectOption {
  id?: string;
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
  private option!: RectOption;
  constructor(option: RectOption) {
    super();
    this.set(option);
  }
  public set(option: Partial<RectOption>) {
    this.option = { ...this.option, ...option };
  }
  public render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    const option = this.option;

    if (option.angle) {
      const originX = option.originX || option.x + option.width / 2;
      const originY = option.originY || option.y + option.height / 2;
      ctx.translate(originX, originY);
      ctx.rotate(option.angle);
      ctx.translate(-originX, -originY);
    }
    if (option.fillStyle) {
      ctx.fillStyle = option.fillStyle;
      ctx.fillRect(option.x, option.y, option.width, option.height);
    }
    if (option.strokeStyle) {
      ctx.strokeStyle = option.strokeStyle;
      ctx.lineWidth = option.lineWidth || 1;
      ctx.strokeRect(option.x, option.y, option.width, option.height);
    }
    ctx.restore();
  }
}
