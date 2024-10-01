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
        let currentMinionPositionX = minionCoordinates.left;
        let distance = this.target.x - ((currentMinionPositionX + minionCoordinates.right) / 2);
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
            this.#validateDirection();
            this.#move();
            this.#validateRules();
            return MinionState.Hunting;
        }
    }

    #validateDirection() {
        let minionCoordinates = this.element.getBoundingClientRect();
        let centerX = (minionCoordinates.x + minionCoordinates.right) / 2;

        if (this.target.x > centerX) {
            this.element.classList.remove("minion-flip-left");
            this.element.classList.add("minion-flip-right");
        } else {
            this.element.classList.remove("minion-flip-right");
            this.element.classList.add("minion-flip-left");
        }
    }

    #validateRules() {
        let minionCoordinates = this.element.getBoundingClientRect();
        let centerX = (minionCoordinates.x + minionCoordinates.right) / 2;
        if (centerX === this.target.x) {
            debugger;
            this.#stopAnimation();
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

export const Direction = Object.freeze({
    Left: "Left",
    Right: "Right"
})