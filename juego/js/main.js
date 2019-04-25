import Compositor from './Compositor.js'
import Canvas from './canvas.js'
import Map from "./map.js";
import {loadJugador, loadLevel} from './loader.js'

const screen = document.getElementById("canvas");
const context = screen.getContext("2d");

const canvas = new Canvas(screen,context);
const map = new Map(loadLevel('mapa'));  
canvas.addObject(map)

class Vec2 {
    constructor(x,y) {
        this.set(x,y)
    }
    set(x,y){
        this.x = x;
        this.y = y
    }
}

class Entity {
    constructor() {
       this.pos = new Vec2(0,0)
       this.vel = new Vec2(0,0)
    }
}
function createSpriteLayer(entity) {
    return function drawSpriteLayer(context) {
        entity.draw(context)
    }
}

Promise.all([  
    loadJugador()
    
]).then(([jugador])=>{
    const comp = new Compositor();

    const gravity = 0.1;

    const mario = new Entity()
    mario.pos.set(130,180)
    mario.vel.set(2,-10)

    mario.draw = function drawMArio(context) {
        jugador.draw('play',context,this.pos.x,this.pos.y)
    }

    mario.update = function updateMario() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
    
    const spriteLayer = createSpriteLayer(mario)
    comp.layers.push(spriteLayer) 
    
    function update(){
        comp.draw(context)
        mario.update();
        mario.vel.y += gravity
        requestAnimationFrame(update)
    }
    update()
});



/// draw(context){
//     super.draw(context);      
    
//     this.data.then(leeJson =>{
//         leeJson.layers.forEach(layer => {             
//             layer.data.forEach((value,index)=>{
//                 let x = 0;
//                 let y = 0;

//                 this.renderable.frame= value -1;
//                 x = index % layer.width;
//                 y = Math.floor(index/layer.width) 

//                 context.save();
//                 context.translate(
//                                     this.position[0] + x * this.renderable.subWidth * this.renderable.scale,
//                                     this.position[1] + y * this.renderable.subHeight * this.renderable.scale);

//                 this.renderable.draw(context)

//                 context.restore();
//             })


//         });
//     })

// }

// function drawBackground(layers,context, sprites){
//     const missing = 'img/dungeon_sheet.png'
//     let img = new Image();
//     img.addEventListener('load',()=>{missing});
//     img.src = missing;


//     let position = [0,0];
//     let scale = 1;

//     var startFrame = 0
//     let frame = startFrame;
//     var framesx = 1;
//     var framesy = 1;
//     var subWidth = img.width / framesx;
//     var subHeight = img.height / framesy;

//      layers.data.forEach((value,index)=>{
//         let x = 0;
//         let y = 0;
//             frame = value -1;
//             x = index % layers.width;
//             y = Math.floor(index/layers.width) 

//             context.save();
//             context.translate(
//                                 position[0] + x * subWidth * scale,
//                                 position[1] + y * subHeight * scale);

//             // this.renderable.draw(context)

//             context.restore();

//         //  for (var x = 0; x < value; x++) {
//         //      for (var y = 0; y < index; y++) {
//         //          sprites.drawTile(bacground.tile,context,x,y)
//         //      }
//         //  }
//      })
// }