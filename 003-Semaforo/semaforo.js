const img = document.querySelector('#img');
const red = document.querySelector('#red');
const yellow = document.querySelector('#yellow');
const green = document.querySelector('#green');
const automatic = document.querySelector('#automatic');
const colors = ['#FA010F','#FED51B','#74F800','#2F2F2F']; //red yellow green off

red.addEventListener('click',onRed);
yellow.addEventListener('click',onYellow);
green.addEventListener('click',onGreen);
automatic.addEventListener('click',automaticOnOff);

function onRed() {

    if (red.textContent === 'Vermelho') {
        red.textContent = 'Desligar';
        yellow.textContent = 'Amarelo';
        green.textContent = 'Verde';
        img.src = './img/vermelho.png';
        document.querySelector('main').style.backgroundColor = colors[0];
    }else{
        red.textContent = 'Vermelho'
        img.src = './img/desligado.png'
        document.querySelector('main').style.backgroundColor = colors[3]
    } 
}

function onYellow() {

    if (yellow.textContent === 'Amarelo') {
        red.textContent = 'Vermelho';
        yellow.textContent = 'Desligar';
        green.textContent = 'Verde';
        img.src = './img/amarelo.png';
        document.querySelector('main').style.backgroundColor = colors[1];
    }else{
        yellow.textContent = 'Amarelo'
        img.src = './img/desligado.png'
        document.querySelector('main').style.backgroundColor = colors[3]
    } 
}

function onGreen() {

    if (green.textContent === 'Verde') {
        red.textContent = 'Vermelho';
        yellow.textContent = 'Amarelo';
        green.textContent = 'Desligar';
        img.src = './img/verde.png';
        document.querySelector('main').style.backgroundColor = colors[2];
    }else{
        green.textContent = 'Verde'
        img.src = './img/desligado.png'
        document.querySelector('main').style.backgroundColor = colors[3]
    }  
}

const funcList = [onRed, onYellow, onGreen];

function onAutomatic() {

    let index = 0;

    intervalID = setInterval(() => {
        if (automatic.textContent === 'Desligar') {
            funcList[index]();
            index = (index + 1) % funcList.length;
        }else{
            clearInterval(intervalID);
        }
    }, 1000);
}

function automaticOnOff() {
    if (automatic.textContent == 'Automático') {
        automatic.textContent = 'Desligar';
        red.textContent = 'Vermelho';
        yellow.textContent = 'Amarelo';
        green.textContent = 'Verde';
        onAutomatic();
        
    }else{
        automatic.textContent = 'Automático';
        red.textContent = 'Vermelho';
        yellow.textContent = 'Amarelo';
        green.textContent = 'Verde';
        img.src = './img/desligado.png'
        document.querySelector('main').style.backgroundColor = colors[3]
    }
}

