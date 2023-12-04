// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const dateTimePicker = document.querySelector('#datetime-picker');
  const startButton = document.querySelector('[data-start]');

  function setStartButtonDisabled(disabled) {
    startButton.disabled = disabled;
  }

  startButton.addEventListener('click', () => {
    setStartButtonDisabled(true);
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

  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function updateCounter(selectedDates) {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = selectedDates[0] - currentDate;

      if (timeDifference <= 0) {
        setStartButtonDisabled(true);
        clearInterval(intervalId);
      }

      const { days, hours, minutes, seconds } = convertMs(timeDifference);

      document.querySelector('[data-days]').textContent = addLeadingZero(days);
      document.querySelector('[data-hours]').textContent =
        addLeadingZero(hours);
      document.querySelector('[data-minutes]').textContent =
        addLeadingZero(minutes);
      document.querySelector('[data-seconds]').textContent =
        addLeadingZero(seconds);
    }, 1000);
  }
});
