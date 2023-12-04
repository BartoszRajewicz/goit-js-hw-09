import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const dateTimePicker = document.querySelector('#datetime-picker');
  const startButton = document.querySelector('[data-start]');
  let intervalId;

  function setStartButtonDisabled(disabled) {
    startButton.disabled = disabled;
  }

  function convertMs(ms) {
    // ... (reszta kodu funkcji convertMs)
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function updateCounter(selectedDates) {
    const currentDate = new Date();
    const timeDifference = selectedDates[0].getTime() - currentDate.getTime();

    if (timeDifference <= 0) {
      setStartButtonDisabled(true);
      clearInterval(intervalId);
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
  }

  function startCountdown(selectedDates) {
    intervalId = setInterval(() => {
      updateCounter(selectedDates);
    }, 1000);
  }

  startButton.addEventListener('click', () => {
    const selectedDates = flatpickr.parseDate(dateTimePicker.value);
    if (selectedDates && selectedDates > new Date()) {
      setStartButtonDisabled(true);
      startCountdown([selectedDates]);
    } else {
      window.alert('Please choose a date in the future');
    }
  });

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates);

      if (selectedDates && selectedDates[0] > new Date()) {
        setStartButtonDisabled(false);
        updateCounter(selectedDates);
      } else {
        setStartButtonDisabled(true);
        window.alert('Please choose a date in the future');
      }
    },
  };

  flatpickr(dateTimePicker, options);
});
