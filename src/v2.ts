export class V2 {
  constructor(public x: number, public y: number) {}
  public add = (v2: V2) => new V2(this.x + v2.x, this.y + v2.y);
  public subtract = (v2: V2) => new V2(this.x - v2.x, this.y - v2.y);
  public dot = (v2: V2) => new V2(this.x * v2.x, this.y * v2.y);
}
