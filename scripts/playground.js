import Banana from "./banana.js";
import { Minion } from "./minion.js";

export default class Playground {
    #minion = new Minion();
    #backgroundAudio = new Audio("assets/background.mp3")
    #voiceLines = [new Audio("assets/voice1.mp3")]
    target = new Banana();
    points = 0;
    constructor() {
        this.#backgroundAudio.autoplay = true;
        this.#backgroundAudio.play();
        this.#voiceLines[0].play();
    }

    render() {
        this.#minion.move();
        if (this.target !== null) {
            if (this.#minion.hasEatenBanana(this.target)) {
                this.target.despawn();
                this.points += 1;
                this.target = new Banana();
            } 
        }

        if (this.points < 10) {
            requestAnimationFrame(this.render.bind(this))
        }
        else {
            this.#won();
        }


    }

    #won() {
        this.#minion.element.style.display = "none";
        let element = document.getElementById('minionFront');
        element.style.display = "inline";
        element.style.left = this.#minion.element.style.left;
        element.style.top = this.#minion.element.style.top;
    }
}