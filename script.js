const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Heart class for animation
class Heart {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = 10 + Math.random() * 20;
    this.speed = 1 + Math.random() * 3;
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
  if(animationRunning){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    hearts.forEach(h => { h.update(); h.draw(); });
  }
  requestAnimationFrame(animate);
}

animate();

// Buttons
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const bottomMessage = document.getElementById('bottomMessage');

yesBtn.addEventListener('click', () => {
  bottomMessage.textContent = "OMG REALLY? I NEVER EXPECTED THIS YAYAYAYAY";
  bottomMessage.classList.remove("scary"); // remove scary style if applied
  rainbowFlash();
});

noBtn.addEventListener('click', () => {
  animationRunning = false;                  // stop hearts
  document.body.style.background = "#111111"; // very dark background
  bottomMessage.textContent = "How dare you, you're not allowed to say no. I'm gonna rewind time to give you the opportunity to answer correctly.";
  bottomMessage.classList.add("scary");       // apply scary font and shake
  setTimeout(() => location.reload(), 4000); // reload after 4s
});

// Rainbow flash function for Yes
function rainbowFlash(){
  const colors = ["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#4B0082","#9400D3"];
  let i=0;
  const interval = setInterval(()=>{
    document.body.style.background = colors[i%colors.length];
    i++;
    if(i>20){
      clearInterval(interval);
      document.body.style.background = "#ffe6e6";
    }
  },150);
}
