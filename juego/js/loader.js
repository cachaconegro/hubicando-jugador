import SpriteSheet from './SpriteSheet.js'

export function loadImage(url) {
    return new Promise(resolve=>{
        const image = new Image();
        image.addEventListener('load', ()=>{
            resolve(image)
        });
        image.src = url;
    })
}

export function loadJugador() {
    return loadImage('/img/player.png')
     .then(image =>{
         const sprites = new SpriteSheet(image,32,32);
         sprites.define('play',14,142,48,48)
         return sprites;
     });      
 }

export function loadLevel(name) {
    return fetch(`/levels/${name}.json`)
    .then(r => r.json());
}