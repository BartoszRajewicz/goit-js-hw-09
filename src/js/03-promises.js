const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const firstDelay = form.querySelector('input[name = "delay"]');
  const delayStep = form.querySelector('input[name = "step"]');
  const amount = form.querySelector('input[name = "amount"]');

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
