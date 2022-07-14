///Imports
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//Refs
const {
  flatpickrInput,
  startBtn,
  daysValue,
  hoursValue,
  minutesValue,
  secondsValue,
  fields,
} = {
  flatpickrInput: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
  fields: document.querySelectorAll('.field'),
};

//Basic markup
fields[0].parentElement.style.display = 'flex';
fields.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.marginRight = '30px';
  field.firstElementChild.style.textAlign = 'center';
  field.firstElementChild.style.fontSize = '36px';
});

//Initialize id for interval
let intervalId;

//Options for flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //Reject any date before or equal to Date.now()
    //Using Notify for alert
    //Disables start button if user changed date from future to before
    if (Date.now() - selectedDates[0].getTime() >= 0) {
      startBtn.setAttribute('disabled', '');
      Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.removeAttribute('disabled');
  },
};
//Initialize flatpickr
const fp = flatpickr(flatpickrInput, options);

//Event to start timer, change markup
startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', '');

  intervalId = setInterval(() => {
    const timeDelta = fp.selectedDates[0].getTime() - Date.now();
    //To stop timer when it hits 0
    if (timeDelta <= 0) {
      clearInterval(intervalId);
      return;
    }
    const convertedDelta = convertMs(timeDelta);

    daysValue.textContent = addLeadingZero(convertedDelta.days);
    hoursValue.textContent = addLeadingZero(convertedDelta.hours);
    minutesValue.textContent = addLeadingZero(convertedDelta.minutes);
    secondsValue.textContent = addLeadingZero(convertedDelta.seconds);
    console.log(convertedDelta);
  }, 1000);
});

//Function to convert milliseconds to object of days,hours,minutes,seconds
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//Function to make string of minimum 2 symbols and start with "0"
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
