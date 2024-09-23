import Cursor from "./cursor.js";

export default class Minion {
    element;
    speed;
    target;

    constructor() {
        this.element = document.getElementById('minion');
        this.speed = 5;
        this.target = new Cursor();
    }

    isHunting() {
        let minionCoordinates = this.element.getBoundingClientRect();
        let currentMinionPositionX = parseInt(minionCoordinates.left) || 0;
        let currentMinionPositionY = parseInt(minionCoordinates.top) || 0;
        
        let distanceX = this.target.x - (currentMinionPositionX + minionCoordinates.width);
        let distanceY = this.target.y - (currentMinionPositionY + minionCoordinates.height);
    
        // Überprüfe, ob der Minion in X und Y nah genug ist
        if (Math.abs(distanceX) <= this.speed) {
            return false;  // Ziel erreicht, Jagd beendet
        }
        return true;  // Distanz zu weit -> Jagd geht weiter
    }
    

    move() {
        let minionCoordinates = this.element.getBoundingClientRect();
        let currentMinionPositionX = parseInt(minionCoordinates.left) || 0;
        let distance = this.target.x - (currentMinionPositionX + minionCoordinates.width);
        this.setDirection(distance);

        if (Math.abs(distance) > this.speed) {
            currentMinionPositionX += this.speed * Math.sign(distance);
            this.element.style.left = currentMinionPositionX + 'px';
        }
    }

    render() {
        if (this.isHunting()) {
            this.move();
            requestAnimationFrame(this.render.bind(this));
        }
        else {
            this.won();
        }
    }

    won() {
        this.stopAnimation();
        console.log("Minion has eaten the banana");
    }

    setDirection(distance) {
        const direction = Math.sign(distance);  

        if (direction === 1) {
            this.element.classList.remove("minion-flip-left");
            this.element.classList.add("minion-flip-right");
        } else if (direction === -1) {
            this.element.classList.remove("minion-flip-right");
            this.element.classList.add("minion-flip-left");
        }
    }

    stopAnimation() {
        for (let i = 0; i < this.element.children.length; i++) {
            let child = this.element.children[i];
            child.getAnimations().forEach((a) => {
                a.pause();
            })
        }
    }
    
    
    
}
