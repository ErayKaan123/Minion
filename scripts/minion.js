import Cursor from "./cursor.js";
import {
    addClassFromElement,
    removeClassFromElement
} from "./utils.js"

export class Minion {
    element = document.getElementById('minion');
    target = new Cursor(); // Target from the Minion
    speed = 5; // The Speed of the Minion
    jumpDistance = 300; // The Jump distance that has to be to jump
    jumpStrenght = 10;
    hasJumped = false;
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

        document.addEventListener('keydown', () => {
            this.#jumpToBanana();
        })
    }

    render() {
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

    #validateRules() {
        let minionCoordinates = this.element.getBoundingClientRect();
        let centerX = (minionCoordinates.left + minionCoordinates.right) / 2;
        if (Math.abs(centerX - this.target.x) < 5) {
            this.#pauseAnimation();
            this.#jumpToBanana();
        }
        else {
            this.#resumeAnimation();
        }
    }

    #jumpToBanana() {
        if (this.hasJumped) return;  // Verhindert mehrfaches Springen
        this.hasJumped = true;  // Markiert den Sprung als ausgeführt
    
        // Füge die Klasse für die Arm-Animation hinzu, um sie parallel zum Sprung zu starten
        addClassFromElement("arm", "arm-animation-jump");
        setTimeout(() => {
            let minionPosition = this.element.getBoundingClientRect();
            let groundLevel = parseInt(minionPosition.top) || 0;
            let jumpVelocity = -300;
            const gravityForce = 8;
        
            const performJump = () => {
                jumpVelocity += gravityForce;
                let newYPosition = groundLevel + jumpVelocity;
        
                this.element.style.top = `${newYPosition}px`;
        
                // Überprüfe, ob der Minion den Boden erreicht hat
                if (newYPosition >= groundLevel) {
                    this.element.style.top = `${groundLevel}px`;
        
                    // Entferne die Arm-Animationsklasse, wenn der Minion wieder am Boden ist
                    removeClassFromElement("arm", "arm-animation-jump");
        
                    return;
                }
        
                // Fordere den nächsten Frame für die Animation an
                requestAnimationFrame(performJump);
        };
    
        // Starte den Sprung parallel zur Arm-Animation
        performJump();
        }, 500);
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