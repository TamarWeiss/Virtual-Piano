import { toRadians } from './pianoConfig';

class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}

  add(m: number): this;
  add(p: Point): this;
  add(arg: number | Point) {
    this.x += typeof arg === 'number' ? arg : arg.x;
    this.y += typeof arg === 'number' ? arg : arg.y;
    return this;
  }

  subtract(m: number): this;
  subtract(p: Point): this;
  subtract(arg: number | Point) {
    if (typeof arg === 'number') this.add(-arg);
    else this.add(arg.mult(-1));
    return this;
  }

  mult(m: number): this;
  mult(p: Point): this;
  mult(arg: number | Point): this {
    this.x *= typeof arg === 'number' ? arg : arg.x;
    this.y *= typeof arg === 'number' ? arg : arg.y;
    return this;
  }

  divide(m: number): this;
  divide(p: Point): this;
  divide(arg: number | Point): this {
    if (typeof arg === 'number') this.mult(1 / arg);
    else this.mult(new Point(1 / arg.x, 1 / arg.y));
    return this;
  }

  distance(p: Point) {
    return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
  }

  destination(distance: number, angle: number) {
    return new Point(Math.sin(toRadians(angle)), Math.cos(toRadians(angle))).mult(distance).add(this);
  }

  clone() {
    return new Point(this.x, this.y);
  }

  toString(): string {
    return `${this.x} ${this.y}`;
  }
}

export default Point;
