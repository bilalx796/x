const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
const bgMusic = document.getElementById('bgMusic');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Heart {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = 10 + Math.random() * 20;
    this.speed = 3 + Math.random() * 4;
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
for (let i = 0; i < 50; i++) hearts.push(new Heart());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => { h.update(); h.draw(); });
  requestAnimationFrame(animate);
}
animate();

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const bottomMessage = document.getElementById('bottomMessage');

let yesClicked = false;
let rainbowInterval;

function startRainbowFlash() {
  const colors = ["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#4B0082","#9400D3"];
  let i = 0;
  rainbowInterval = setInterval(() => {
    document.body.style.background = colors[i % colors.length];
    i++;
  }, 150);
}

function stopRainbowFlash() {
  clearInterval(rainbowInterval);
}

function showCats() {
  const leftCat = document.createElement('img');
  leftCat.src = "https://i.pinimg.com/originals/7f/d4/93/7fd493d029e88f51324cc8e3ebb8d403.gif";
  leftCat.classList.add("catGif", "left");
  document.body.appendChild(leftCat);

  const rightCat = document.createElement('img');
  rightCat.src = "https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyanhmeG8yMGEwNzU5eDBlM2kwYzMwbHg0bmo5Y21jb3dydDgybmhrYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/BK1EfIsdkKZMY/200w.gif";
  rightCat.classList.add("catGif", "right");
  document.body.appendChild(rightCat);
}

yesBtn.addEventListener('click', () => {
  yesClicked = true;

  bottomMessage.textContent = "OMG REALLY? I NEVER EXPECTED THIS YAYAYAYAY";
  bottomMessage.classList.remove("noFont");
  bottomMessage.classList.add("yesFont");

  startRainbowFlash();
  showCats();

  // Start music
  bgMusic.volume = 0.5;
  bgMusic.play();

  // Increase volume by 20%
  bgMusic.volume = Math.min(bgMusic.volume + 0.2, 1);
});

noBtn.addEventListener('click', () => {
  if (yesClicked) return;

  stopRainbowFlash();
  document.body.style.background = "#111111";

  bottomMessage.textContent = "How DARE you, you're not allowed to say no. I shall rewind time to allow you to fix your mistake.";
  bottomMessage.classList.remove("yesFont");
  bottomMessage.classList.add("noFont");

  // Stop music immediately
  bgMusic.pause();
  bgMusic.currentTime = 0;

  setTimeout(() => location.reload(), 4000);
});
