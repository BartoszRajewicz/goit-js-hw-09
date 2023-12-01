function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector([data - start]);
const stopButton = document.querySelector([data - stop]);
let timerId = null;

startButton.addEventListener('click', () => {
  timerId = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
  clearInterval(timerId);
  startButton.disabled = false;
  stopButton.disabled = true;
});
