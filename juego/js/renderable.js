const missing = 'img/dungeon_sheet.png'

export default class Renderable {
    constructor(image = missing, scale=1,startFrame = 0, frameCount=0, framesx=1,framesy=1) {
        this.img = new Image();
        this.img.addEventListener('load',()=>{image});
        this.img.src = image;
       
        this.scale = scale;

        this.frame = startFrame;
        this.startFrame = startFrame;
        this.frameCount = frameCount;
 
        this.framesx = framesx;
        this.framesy = framesy;
        
        this.subWidth = this.img.width / this.framesx;
        this.subHeight = this.img.height / this.framesy;   
    }
    draw(context){  
        if (this.frame > this.startFrame + this.frameCount) {
            this.frame = this.startFrame;
        }

        let posx = (this.frame % this.framesx) * this.subWidth; 
        let posy = Math.floor(this.frame/this.framesx) * this.subHeight;
        context.drawImage(this.img,posx,posy,this.subWidth,this.subHeight,0,0,this.subWidth*this.scale,this.subHeight*this.scale);           
    }
}