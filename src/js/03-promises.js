//Imports
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//Refs
const { delayValue, stepValue, amountValue, formEl } = {
  delayValue: document.querySelector("[name='delay']"),
  stepValue: document.querySelector("[name='step']"),
  amountValue: document.querySelector("[name='amount']"),
  formEl: document.querySelector('.form'),
};

//Event listner for submit
formEl.addEventListener('submit', e => {
  //Prevent page reload on submit
  e.preventDefault();

  //Vars for delay and step taken from form and made into number
  let FIRST_DELAY = Number(delayValue.value);
  const DELAY_STEP = Number(stepValue.value);

  //Loop to create AMOUNT of promises
  for (let index = 1; index <= amountValue.value; index++) {
    createPromise(index, FIRST_DELAY)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    //Increate delay every iteration
    FIRST_DELAY += DELAY_STEP;
  }

  //Reset form after loop
  formEl.reset();
});

//Function to create SINGLE promise at delay value and return object on resolve or reject
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
}
