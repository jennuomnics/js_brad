const element = document.querySelector('img')
let start;

function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
    console.log(start, timestamp)
    const elapsed = timestamp - start;

    // Math.min() is used here to make sure the element stops at exactly 200px
    const shift = Math.min(0.1 * elapsed, 200);
    element.style.transform = `translateX(${shift}px)`;
    if (shift < 200) {
        requestAnimationFrame(step);
    }
}

requestAnimationFrame(step);