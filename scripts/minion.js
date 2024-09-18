import Cursor from "./cursor.js"

export default class Minion {

    element;
    speed;
    target;

    constructor() {
        this.element = document.getElementById('minion');
        this.speed = 5;
        this.target = new Cursor();
    }

    checkAllRules() {
        if (mouseX !== null) {
            let minionCoordinates = minion.getBoundingClientRect();
            let currentMinionPositionX = parseInt(minionCoordinates.left) || 0;
            let distance = mouseX - (currentMinionPositionX + minionCoordinates.width);
            if (distance > speed) {
                currentMinionPositionX += speed * Math.sign(distance);
                minion.style.left = (currentMinionPositionX) + 'px';
            } else if(distance < speed) {
                
            }
            else {
            }
        }
    }

    render() {
        //this.checkAllRules();
        this.move();
        requestAnimationFrame(this.render.bind(this));
    }

    move() {

    }
    
    
}