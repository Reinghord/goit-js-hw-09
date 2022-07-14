//Refs and Interval ID initialization
const { startBtn, stopBtn } = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let timerId = null;

//Event listener for start button
//Disables the button after click
//Creates interval to change bg-c for random color every 1sec
startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', '');
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

//Event listener for stop button
//Clears interval
//Enables start button
stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
});

//Function for random color generation
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
