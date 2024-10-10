function removeClassFromElement(elementId, className) {
    let element = document.getElementById(elementId);
    element.classList.remove(className);
};

function addClassFromElement(elementId, className) {
    let element = document.getElementById(elementId);
    element.classList.add(className);
};

export {addClassFromElement, removeClassFromElement};