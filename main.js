
const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');
const messageDiv = document.getElementById('message');
const countdownDiv = document.getElementById('countdown');
const finalTextDiv = document.getElementById('final-text');
const surpriseImg = document.getElementById('surprise-img');
const kittenGif = document.getElementById('kitten-gif');

const noMessages = [
  "umm choose again",
  "i think ur choosing the wrong one lol",
  "ok fr i get it's funny but stop now",
  "BABY STOP ITTTT NOWW",
  "ok ykw, choose no again and see what happens"
];

let noCount = 0;
let countdownStarted = false;
let yesFullScreen = false;

noBtn.addEventListener('click', () => {
  if (noCount < noMessages.length) {
    messageDiv.textContent = noMessages[noCount]; // replace previous message
    noCount++;
  } else if (!countdownStarted) {
    countdownStarted = true;
    startCountdown();
  }
});

yesBtn.addEventListener('click', () => {
  if (!yesFullScreen) {
    yesFullScreen = true;
    // fill the screen
    yesBtn.style.position = "fixed";
    yesBtn.style.top = 0;
    yesBtn.style.left = 0;
    yesBtn.style.width = "100%";
    yesBtn.style.height = "100%";
    yesBtn.style.fontSize = "5em";
    yesBtn.style.zIndex = 9999;

    // show final text above
    finalTextDiv.textContent = "yeah what now?";

    // show kitten/puppy image
    surpriseImg.style.display = "block";
  } else {
    // second click triggers rainbow flash and kitten GIF
    rainbowFlash();
  }
});

function startCountdown() {
  let count = 3;
  countdownDiv.textContent = count;
  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownDiv.textContent = count;
    } else {
      clearInterval(interval);
      countdownDiv.textContent = "";
      yesBtn.click(); // force full screen yes
    }
  }, 1000);
}

function rainbowFlash() {
  let colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"];
  let i = 0;
  const interval = setInterval(() => {
    document.body.style.background = colors[i % colors.length];
    i++;
    if (i > 20) { // flash 20 times
      clearInterval(interval);
      document.body.style.background = "#ffe6e6"; // reset background
      kittenGif.style.display = "block";
    }
  }, 150);
}
