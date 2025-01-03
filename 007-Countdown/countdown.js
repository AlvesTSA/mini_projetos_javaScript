'use strict';

const seconds = document.querySelector('#segundos');
const minutes = document.querySelector('#minutos');
const hours = document.querySelector('#horas');
const days = document.querySelector('#dias');

const formatDigit = (digit) => String(digit).padStart(2, '0');

const Time = (time) => {

    const qtDays = Math.floor(time / (60 * 60 * 24));
    let rest = time % (60 * 60 * 24);
    const qtHours = Math.floor(rest / (60 * 60));
    rest %= (60 * 60);
    const qtMinutes = Math.floor(rest / 60);
    const qtSeconds = Math.floor(rest % 60);

    days.textContent = formatDigit(qtDays);
    hours.textContent = formatDigit(qtHours);
    minutes.textContent = formatDigit(qtMinutes);
    seconds.textContent = formatDigit(qtSeconds);
}

const countDown = (time) => {

    const stopCount = () => clearInterval(ID);

    const count = () => {

        if (time === 0) {
            stopCount();
        }
        Time(time);
        time--;
    }
    const ID = setInterval(count, 1000);
}

const getTime = () => {

    const dateEvent = new Date('2026-01-03 20:00:00');
    const today = Date.now();
    return Math.floor((dateEvent - today) / 1000);
}

countDown(getTime());