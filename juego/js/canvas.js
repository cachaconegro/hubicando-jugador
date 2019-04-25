

export default class Canvas {
    constructor(screen,context) {
        this.screen = screen;
        this.context = context;      
        // this.context.mozImageSmoothingEnabled = false;
        // this.context.webkitImageSmoothingEnabled = false;
        // this.context.msImageSmoothingEnabled = false;
        // this.context.imageSmoothingEnabled = false;
        this.objs = [];

        requestAnimationFrame(this.loop.bind(this));   
    }

    addObject(obj){ 
           this.objs.push(obj) 
    } 

    loop(){              
        this.objs.forEach( obj => {
            obj.draw(this.context)
        })
       requestAnimationFrame(this.loop.bind(this));
    }
}