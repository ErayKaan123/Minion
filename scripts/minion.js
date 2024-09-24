import Cursor from "./cursor.js";

export class Minion {
    element;
    speed;
    target;

    constructor() {
        this.element = document.getElementById('minion');
        this.speed = 5;
        this.target = new Cursor();
    }

    #isHunting() {
        let minionCoordinates = this.element.getBoundingClientRect();
        let currentMinionPositionX = parseInt(minionCoordinates.left) || 0;
        let currentMinionPositionY = parseInt(minionCoordinates.top) || 0;
    
        let minionWidth = minionCoordinates.width;
        let minionHeight = minionCoordinates.height;
    
        let targetX = this.target.x;
        let targetY = this.target.y;
    
        let withinXRange = targetX >= (currentMinionPositionX - (this.target.width + this.speed * 2)) && targetX <= (currentMinionPositionX + minionWidth + this.speed * 2);
        let withinYRange = targetY >= (currentMinionPositionY - this.speed * 2) && targetY <= (currentMinionPositionY + minionHeight + this.speed * 2);
        
        return !(withinXRange && withinYRange);
    }

    #move() {
        let minionCoordinates = this.element.getBoundingClientRect();
        let currentMinionPositionX = parseInt(minionCoordinates.left) || 0;
        let distance = this.target.x - (currentMinionPositionX + minionCoordinates.width);
        this.#setDirection(distance);
        if (Math.abs(distance) > this.speed) {
            currentMinionPositionX += this.speed * Math.sign(distance);
            this.element.style.left = currentMinionPositionX + 'px';
        }
    }

    spawn() {
        if (this.#isHunting()) { 
            this.#move(); 
            return MinionState.Hunting;
        } else {
            this.#stopAnimation();
            return MinionState.Eaten;
        }
    }

    #setDirection(distance) {
        const direction = Math.sign(distance);  

        if (direction === 1) {
            this.element.classList.remove("minion-flip-left");
            this.element.classList.add("minion-flip-right");
        } else if (direction === -1) {
            this.element.classList.remove("minion-flip-right");
            this.element.classList.add("minion-flip-left");
        }
    }

    #stopAnimation() {
        this.#removeClassFromElement('arm', 'arm-animation-running');
        this.#removeClassFromElement("left-leg", 'left-leg-animation-running');
        this.#removeClassFromElement('right-leg', 'right-leg-animation-running');
    }

    #removeClassFromElement(elementId, className) {
        let element = document.getElementById(elementId);
        element.classList.remove(className);
    }
}

export const MinionState = Object.freeze({
    Hunting: "Hunting",
    Eaten: "Eaten"
});
