const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 150, 100);

ctx.arc(300, 300, 60, 0, Math.PI * 2, true);

ctx.fill()

ctx.beginPath();
ctx.strokeStyle = 'red'
ctx.moveTo(10, 10);
ctx.lineTo(300, 300);

ctx.stroke();