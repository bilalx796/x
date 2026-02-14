const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Heart class for animation (faster falling)
class Heart {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = 10 + Math.random() * 20;
    this.speed = 3 + Math.random() * 4; // faster than before
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

let animationRunning = true;

function animate() {
  if (animationRunning) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => { h.update(); h.draw(); });
  }
  requestAnimationFrame(animate);
}

animate();

// Buttons
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const bottomMessage = document.getElementById('bottomMessage');

let rainbowInterval;
let rainbowActive = false;

// Infinite rainbow flash
function startRainbowFlash() {
  if (rainbowActive) return; // avoid multiple intervals
  rainbowActive = true;
  const colors = ["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#4B0082","#9400D3"];
  let i = 0;
  rainbowInterval = setInterval(() => {
    document.body.style.background = colors[i % colors.length];
    i++;
  }, 150);
}

// Stop rainbow
function stopRainbowFlash() {
  clearInterval(rainbowInterval);
  rainbowActive = false;
}

// Add cat GIFs
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

// Yes click
yesBtn.addEventListener('click', () => {
  bottomMessage.textContent = "OMG REALLY? I NEVER EXPECTED THIS YAYAYAYAY";
  bottomMessage.classList.remove("noFont");
  bottomMessage.classList.add("yesFont");
  startRainbowFlash(); // now infinite
  showCats();
});

// No click
noBtn.addEventListener('click', () => {
  animationRunning = false;
  stopRainbowFlash(); // stop rainbow
  document.body.style.background = "#111111"; // dark
  bottomMessage.textContent = "How dare you, you're not allowed to say no. I'm gonna rewind time to give you the opportunity to answer correctly.";
  bottomMessage.classList.remove("yesFont");
  bottomMessage.classList.add("noFont");
  setTimeout(() => location.reload(), 4000);
});
