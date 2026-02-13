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
let yesClicked = false;

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
  if (!yesClicked) {
    yesClicked = true;

    // Hide the Yes button
    yesBtn.style.display = 'none';

    // Show final text above
    finalTextDiv.textContent = "yeah what now?";

    // Show kitten/puppy image
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
      yesBtn.click(); // force yes
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
