import Renderable from "./renderable.js";
import GameObject from "./gameobject.js";

const playerImg = 'img/player.png';

export default class Player extends GameObject {
    constructor(x,y) {
        super();

        this.position = [x,y];

        this.facing = 0;

        this.renderable = [
            new Renderable(playerImg, 1,18,0,9,4,10),
            new Renderable(playerImg, 1, 1,7,9,4,10),
            new Renderable(playerImg, 1,27,7,9,4,10),
            new Renderable(playerImg, 1,19,7,9,4,10),
            new Renderable(playerImg, 1, 9,7,9,4,10)
        ];           
    }

    draw(context){
    //    context.clearRect(0, 0, canvas.width, canvas.height);
       context.save();
       
       context.translate(this.position[0],this.position[1]);
       
       this.renderable[this.facing].draw(context);

       context.restore(); 
    }
}