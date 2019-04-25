import Renderable from "./renderable.js";

export default class Map  {
    constructor(mapJson = loadLevel(name), mapImg) {     
            this.position = [0,0];  
            this.renderable = new Renderable(mapImg,1,0,240,24,10);
            // this.renderable = new Renderable(mapImg,1,0,240,15,5);
            this.data = mapJson.then(resolve =>{return resolve})          
    }
    
    draw(context){
        this.data.then(leeJson =>{
            
            if(leeJson.layers[0].type == 'tilelayer') {
                leeJson.layers.forEach(layer => {             
                    layer.data.forEach((value,index)=>{
                        let x = 0;
                        let y = 0;
    
                        this.renderable.frame = value -1;
                        x = index % layer.width;
                        y = Math.floor(index/layer.width) 
    
                        context.save();
    
                        context.translate(
                            this.position[0] + x * this.renderable.subWidth * this.renderable.scale,
                            this.position[1] + y * this.renderable.subHeight * this.renderable.scale);
    
                        this.renderable.draw(context)
    
                        context.restore();
                    })
                });
            }
            else if(leeJson.layers[0].type == 'objectgroup'){
                console.log(leeJson.objects);
            }
        })
    }
}