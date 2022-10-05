import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';




const refs = {
    startBtn : document.querySelector('button[data-start]'),
    day: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
    input: document.querySelector('#datetime-picker'),
} 

refs.startBtn.setAttribute("disabled", 'true')

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
        let dateNow = new Date();
      
        if(selectedDates[0] < dateNow ) {
            Notify.failure('Please choose a date in the future');
        } else if(selectedDates[0] > dateNow ) {
            refs.startBtn.removeAttribute("disabled")
        }
        refs.startBtn.addEventListener("click", onStartBtn)
    },
  };

const fp = flatpickr("#datetime-picker", options);
let timerId = null;
let result;

function onStartBtn () {
    refs.startBtn.setAttribute("disabled", 'true'),
    refs.input.setAttribute("disabled", 'true')

    const futureDate = new Date (fp.selectedDates[0])
    const futureTime = futureDate.getTime()

    timerId = setInterval(() => {
        dateNow = new Date;
        timeNow = dateNow.getTime()
        timeToFinish = futureTime - timeNow
        result = convertMs(timeToFinish);
        console.log(typeof result.days)
        refs.day.textContent = `${result.days.toString().padStart(2,'0')}`;
        refs.hours.textContent = `${result.hours.toString().padStart(2,'0')}`;
        refs.minutes.textContent = `${result.minutes.toString().padStart(2,'0')}`;
        refs.seconds.textContent = `${result.seconds.toString().padStart(2,'0')}`;

        canselInterval(result)

    }, 1000)

}

function canselInterval (result) {
    if(result.days === 0 && result.hours === 0 && result.minutes === 0 && result.seconds === 0) {
        clearInterval(timerId)
        refs.startBtn.removeAttribute("disabled"),
        refs.input.removeAttribute("disabled")
    }
}

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
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


