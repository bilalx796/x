const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Heart {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = 10 + Math.random() * 20;
    this.speed = 1 + Math.random() * 3;
    this.angle = Math.random() * Math.PI * 2;
  }
  draw() {
    ctx.fillStyle = "#ff4d94";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x, this.y - this.size / 2, this.x - this.size, this.y - this.size / 2, this.x - this.size, this.y);
    ctx.bezierCurveTo(this.x - this.size, this.y + this.size / 2, this.x, this.y + this.size / 1.5, this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x, this.y + this.size / 1.5, this.x + this.size, this.y + this.size / 2, this.x + this.size, this.y);
    ctx.bezierCurveTo(this.x + this.size, this.y - this.size / 2, this.x, this.y - this.size / 2, this.x, this.y);
    ctx.fill();
  }
  update() {
    this.y += this.speed;
    if (this.y > canvas.height + this.size) this.reset();
  }
}

const hearts = [];
for (let i = 0; i < 50; i++) {
  hearts.push(new Heart());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => {
    h.update();
    h.draw();
  });
  requestAnimationFrame(animate);
}

animate();
