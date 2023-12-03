const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const firstDelay = parseInt(form.querySelector('input[name="delay"]').value);
  const delayStep = parseInt(form.querySelector('input[name="step"]').value);
  const amount = parseInt(form.querySelector('input[name="amount"]').value);

  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay + (i - 1) * delayStep;

    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  } else {
    return Promise.reject({ position, delay });
  }
}
