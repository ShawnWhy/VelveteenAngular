

import { Vector } from "./Vector";




export class Agent {
pos:Vector;
vel:Vector
radius:number
fillStyle:any
	constructor(x:any, y:any, fillStyle:any) {
		this.pos = new Vector(x, y);
		this.vel = new Vector((Math.random()*2-1)*.5, (Math.random()*2-1)*.5);
		this.radius = Math.floor(Math.random()*40+15)
		this.fillStyle = fillStyle
	}

	bounce(width:number, height:number) {
		if (this.pos.x <= 0 || this.pos.x >= width)  this.vel.x *= -1;
		if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
	}

	update() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	
	}
draw(context: CanvasRenderingContext2D) {
  context.save();
  context.translate(this.pos.x, this.pos.y);
  context.fillStyle = this.fillStyle;
  
  const outerRadius = this.radius;
  const innerRadius = this.radius / 2;
  const spikes = 5; // Number of spikes for the star
  
  let rotation = Math.PI / 2 * 3;
  let x = 0;
  let y = 0;
  
  const step = Math.PI / spikes;

  context.beginPath();
  context.moveTo(this.pos.x, this.pos.y - outerRadius);

  for (let i = 0; i< spikes; i++) {
    x = this.pos.x + Math.cos(rotation) * outerRadius;
    y = this.pos.y + Math.sin(rotation) * outerRadius;
    context.lineTo(x, y);
    rotation += step;

    x = this.pos.x + Math.cos(rotation) * innerRadius;
    y = this.pos.y + Math.sin(rotation) * innerRadius;
    context.lineTo(x, y);
    rotation += step;
  }
  
  context.lineTo(this.pos.x, this.pos.y - outerRadius);
  context.closePath();
  context.lineWidth = 2;
  context.strokeStyle = 'black';
  context.stroke();
  context.fill();
  
  context.restore();
}


}