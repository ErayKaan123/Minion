export default class Cursor {
    x;
    y;
    width = 64 // Cursor width with custom image to calculate the distance
    
    constructor() {
        document.addEventListener('mousemove', (e) => {
            this.x = e.clientX;
            this.y = e.clientY;
        });
    }
}