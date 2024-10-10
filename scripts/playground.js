import { Minion, MinionState } from "./minion.js";

export default class Playground {
    #minion = new Minion();
    #backgroundAudio = new Audio("assets/background.mp3")
    #voiceLines = [new Audio("assets/voice1.mp3")]
    constructor() {
        this.#backgroundAudio.autoplay = true;
        this.#backgroundAudio.play();
        this.#voiceLines[0].play();
    }

    render() {
        let minionState = this.#minion.render();
        if (minionState === MinionState.Hunting) {
            requestAnimationFrame(this.render.bind(this));
        }
        else if (minionState === MinionState.Eaten) {
            this.#won();
        }
    }
    
    #showMinionFromFront() {
        this.#minion.element.style.display = "none";
        let element = document.getElementById('minionFront');
        element.style.display = "inline";
        element.style.left = this.#minion.element.style.left;
        element.style.top = this.#minion.element.style.top;
    }

    #won() {
        this.#showMinionFromFront();
        
    }
}