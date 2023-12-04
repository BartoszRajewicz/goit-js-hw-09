import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const dateTimePicker = document.querySelector('#datetime-picker');
  const startButton = document.querySelector('[data-start]');
  let intervalId;

  function setStartButtonDisabled(disabled) {
    startButton.disabled = disabled;
  }

  function clearTimerInterval() {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }

  startButton.addEventListener('click', () => {
    const selectedDates = flatpickr.parseDate(
      dateTimePicker.value,
      'Y-m-d H:i'
    );
    if (selectedDates > new Date()) {
      setStartButtonDisabled(true);
      clearTimerInterval();
      startCounter(selectedDates);
    } else {
      window.alert('Please choose a date in the future');
    }
  });

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  };

  flatpickr(dateTimePicker, {
    ...options,
    onClose(selectedDates) {
      if (selectedDates && selectedDates[0] > new Date()) {
        setStartButtonDisabled(false);
      } else {
        setStartButtonDisabled(true);
        window.alert('Please choose a date in the future');
      }
    },
  });

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function updateCounter(selectedDate) {
    const currentDate = new Date();
    const timeDifference = selectedDate - currentDate;

    if (timeDifference <= 0) {
      setStartButtonDisabled(false);
      clearTimerInterval();
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);

      document.querySelector('[data-days]').textContent = addLeadingZero(days);
      document.querySelector('[data-hours]').textContent =
        addLeadingZero(hours);
      document.querySelector('[data-minutes]').textContent =
        addLeadingZero(minutes);
      document.querySelector('[data-seconds]').textContent =
        addLeadingZero(seconds);
    }
  }

  function startCounter(selectedDate) {
    updateCounter(selectedDate);
    intervalId = setInterval(() => {
      updateCounter(selectedDate);
    }, 1000);
  }
});
