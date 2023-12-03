const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      return Promise.resolve({ position, delay });
    } else {
      return Promise.reject({ position, delay });
    }
  }
});

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
