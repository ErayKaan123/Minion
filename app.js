import { Minion } from "./minion";
let minion = document.getElementById('minion');
let mouseX = null;
let speed = 5; 

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
});

function moveMinion() {
    if (mouseX !== null) {
        let minionCoordinates = minion.getBoundingClientRect();
        let currentMinionPositionX = parseInt(minionCoordinates.left) || 0;
        let distance = mouseX - (currentMinionPositionX + minionCoordinates.width);
        if (distance > speed) {
            currentMinionPositionX += speed * Math.sign(distance);
            minion.style.left = (currentMinionPositionX) + 'px';
        } else if(distance < speed) {
            
        }
        else {
        }
    }
    requestAnimationFrame(moveMinion);
}

function render() {

}

render();