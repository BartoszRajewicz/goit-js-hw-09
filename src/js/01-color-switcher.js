function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector(".data-start");
const stopButton = document.querySelector("data-stop");
let timerId = null;