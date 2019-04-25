import Canvas from './canvas.js'
import Map from "./map.js";
import Engine from "./engine.js";
import Player from "./player.js";

// const testIMG = 'img/32.png'
async function loadLevel(name) {
    let respuesta = await fetch(`/levels/${name}.json`)
    let json = await respuesta.json()
    return json   
}


//creando el mapa desde el canvas
const canvas = new Canvas();
const map = new Map(loadLevel('mapa'));  
canvas.addObject(map);

//creando el jugador desde eu nuevo canvas con creatElement
const engine = new Engine();
const player = new Player(0,0);
engine.addObject(player)



engine.update = (dt)=>{
    if(engine.input.isKeyDown("ArrowUp")){ 
        player.translate (0, -100*dt);
        player.facing = 1;
    }

    if(engine.input.isKeyDown("ArrowDown")){ 
        player.translate (0, 100*dt);
        player.facing = 3;
    } 
    
    if(engine.input.isKeyDown("ArrowLeft")){ 
        player.translate (-100*dt, 0);
        player.facing = 4;
    }
        
    if(engine.input.isKeyDown("ArrowRight")){ 
        player.translate (100*dt, 0);
        player.facing = 2;
    }
    
    if (!engine.input.isKeyDown("ArrowUp")&&
        !engine.input.isKeyDown("ArrowDown")&&
        !engine.input.isKeyDown("ArrowLeft")&&
        !engine.input.isKeyDown("ArrowRight"))
        player.facing = 0
       
}




