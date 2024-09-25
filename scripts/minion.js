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
        let minionCenterX = minionCoordinates.left + minionCoordinates.width / 2;
        let minionCenterY = minionCoordinates.top + minionCoordinates.height / 2;
    
        let targetX = this.target.x;
        let targetY = this.target.y;
    
        // Berechne die Distanzen zwischen den Mittelpunkten des Minions und des Ziels
        let distanceX = Math.abs(targetX - minionCenterX);
        let distanceY = Math.abs(targetY - minionCenterY);

        // Füge einen kleinen Puffer (z.B. 10 Pixel) hinzu, um zu bestimmen, wann der Minion nah genug ist
        let threshold = 10;
        return (distanceX <= threshold && distanceY <= threshold);
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
