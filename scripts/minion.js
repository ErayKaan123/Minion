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

    #eatenBanana() {
        let minionCoordinates = this.element.getBoundingClientRect();
        return(
            (this.target.x < minionCoordinates.right + 10 && this.target.x > minionCoordinates.left) &&
            (this.target.y < minionCoordinates.bottom && this.target.y > minionCoordinates.top)
        )
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
        if (this.#eatenBanana()) { 
            this.#stopAnimation();
            return MinionState.Eaten;
        } else {
            this.#move();
            return MinionState.Hunting;
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
