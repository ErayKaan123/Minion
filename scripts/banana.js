export default class Banana {
    x;
    y;
    width = 64; // Cursor width with custom image 
    height = 64; // Cursor height with custom image
    element;
    constructor() {
        this.#spawn();
    }

    #spawn() {
        let asElement = document.createElement('img');
        asElement.src = "./assets/banana-64x64.png";
        // Setze die Position auf zufällige x- und y-Koordinaten
        this.x = this.#generateRandomNumber(window.innerWidth - this.width);
        this.y = this.#generateRandomNumber(window.innerHeight - this.height);
        asElement.style.position = "absolute";
        asElement.style.left = `${this.x}px`; // Korrektur ohne Leerzeichen vor 'px'
        asElement.style.top = `${this.y}px`;
        document.body.appendChild(asElement);
        this.element = asElement;
    }

    despawn() {
        this.despawn;
        document.body.removeChild(this.element);
    }

    #generateRandomNumber(max) {
        return Math.floor(Math.random() * max); // Zufällige Zahl zwischen 0 und max
    }
}
