export default class Cursor {
    x;
    y;

    constructor() {
        document.addEventListener('mousemove', (e) => {
            this.x = e.clientX;
            this.y = e.clientY;
        });
    }
}