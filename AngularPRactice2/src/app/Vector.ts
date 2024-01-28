export class Vector {
    x:number
    y:number
  constructor(x:any, y:any) {
    this.x = x;
    this.y = y;
  }

  getDistance(v:any) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
