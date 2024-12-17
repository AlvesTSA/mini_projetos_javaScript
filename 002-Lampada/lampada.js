const lamp = document.querySelector("#lamp");
const turnOnOff = document.querySelector("#turnOnOff");
const colors = ['#FDFE7C','#212121']

function isBroken() {
    return lamp.src.indexOf ('quebrada') > -1;
}

function turnOn() {
    if (!isBroken()) {
        lamp.src = './img/ligada.jpg';
        turnOnOff.textContent = "desligar";
        document.querySelector('main').style.backgroundColor = colors[0]
    } 
}

function turnOff() {
    if (!isBroken()) {
       lamp.src = './img/desligada.jpg';
       turnOnOff.textContent = "ligar";
       document.querySelector('main').style.backgroundColor = colors[1]
    }  
}

function turnBroken() {
    lamp.src = './img/quebrada.jpg';
    document.querySelector('main').style.backgroundColor = colors[1]
}

let isOn = false

turnOnOff.addEventListener('click',function () {
    
    if (isOn) {
        turnOff()
    }else{
        turnOn()
    }
    isOn = !isOn
})

lamp.addEventListener('dblclick',turnBroken)
lamp.addEventListener('mouseover',turnOn)
lamp.addEventListener('mouseleave',turnOff)