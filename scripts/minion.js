import {
    addClassFromElement,
    removeClassFromElement
} from "./utils.js"

export class Minion {
    element = document.getElementById('minion');
    speed = 5; // The Speed of the Minion
    currentKey = KeyType.ArrowRight;

    hasEatenBanana(banana) {
        let minionCoordinates = this.element.getBoundingClientRect();
        return(
            (banana.x < minionCoordinates.right + 10 && banana.x > minionCoordinates.left) &&
            (banana.y < minionCoordinates.bottom && banana.y > minionCoordinates.top)
        )
    }

    constructor() {
        document.addEventListener('keydown', (e) => this.#validateDirection(e))
    }

    move() {
        let minionCoordinates = this.element.getBoundingClientRect();
        let currentMinionPositionX = minionCoordinates.left;
        
        switch(this.currentKey) {
            case KeyType.ArrowLeft:
                currentMinionPositionX -= this.speed; //Left
                break;
            case KeyType.ArrowRight:
                currentMinionPositionX += this.speed; // Right
                break;
        }

        if (currentMinionPositionX > 0 && currentMinionPositionX < (window.innerWidth - this.element.offsetWidth) - 50) {
            this.element.style.left = `${currentMinionPositionX}px`;
        }
    }

    #validateDirection(e) {
        let keyCode = e.keyCode;
        
        switch(keyCode) {
            case KeyType.ArrowRight:
            case KeyType.D:
                this.currentKey = KeyType.ArrowRight;
                this.element.classList.remove("minion-flip-left");
                this.element.classList.add("minion-flip-right");
                break;
            case KeyType.ArrowLeft:
            case KeyType.A:
                this.currentKey = KeyType.ArrowLeft;
                this.element.classList.remove("minion-flip-right");
                this.element.classList.add("minion-flip-left");
                break;
            
        }
    }
    

    #pauseAnimation() {
        removeClassFromElement('arm', 'arm-animation-running');
        removeClassFromElement("left-leg", 'left-leg-animation-running');
        removeClassFromElement('right-leg', 'right-leg-animation-running');
    };
    
    #resumeAnimation() {
        addClassFromElement('arm', 'arm-animation-running');
        addClassFromElement("left-leg", 'left-leg-animation-running');
        addClassFromElement('right-leg', 'right-leg-animation-running');
    };
}

export const Direction = Object.freeze({
    Left: "Left",
    Right: "Right"
})

export const KeyType = Object.freeze({
    ArrowLeft: 37,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
    A: 65,
    W: 87,
    D: 68,
    S: 83
    Space: 32
})