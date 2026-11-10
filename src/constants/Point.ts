class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}

  // Handy if you want to offset or rotate points easily
  add(p: Point) {
    return new Point(this.x + p.x, this.y + p.y);
  }

  mult(m: number) {
    return new Point(m * this.x, m * this.y);
  }

  multPoint(p: Point) {
    return new Point(p.x * this.x, p.y * this.y);
  }
}

export default Point;
