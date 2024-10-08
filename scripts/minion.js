import Cursor from "./cursor.js";

export class Minion {
    element = document.getElementById('minion');
    speed = 5;
    target = new Cursor();

    #hasEatenBanana() {
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
        if (this.#hasEatenBanana()) { 
            this.#pauseAnimation();
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
        let centerX = (minionCoordinates.left + minionCoordinates.right) / 2;
        if (Math.abs(centerX - this.target.x) < 5) {
            this.#pauseAnimation();
        }
        else {
            this.#resumeAnimation();
        }
    }
    

    #pauseAnimation() {
        this.#removeClassFromElement('arm', 'arm-animation-running');
        this.#removeClassFromElement("left-leg", 'left-leg-animation-running');
        this.#removeClassFromElement('right-leg', 'right-leg-animation-running');
    }

    #resumeAnimation() {
        this.#addClassFromElement('arm', 'arm-animation-running');
        this.#addClassFromElement("left-leg", 'left-leg-animation-running');
        this.#addClassFromElement('right-leg', 'right-leg-animation-running');
    }

    #removeClassFromElement(elementId, className) {
        let element = document.getElementById(elementId);
        element.classList.remove(className);
    }

    #addClassFromElement(elementId, className) {
        let element = document.getElementById(elementId);
        element.classList.add(className);
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