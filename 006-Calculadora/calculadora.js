"use strict";

const dis = document.querySelector('#display');
const numbers = document.querySelectorAll('[id*=tecla]');
const operators = document.querySelectorAll('[id*=operador]');
const iqual = document.querySelector('#igual');
const clearDis = document.querySelector('#limparDisplay');
const clearCal = document.querySelector('#limparCalculo');
const backspace = document.querySelector('#backspace');
const invert = document.querySelector('#inverter');
const decimal = document.querySelector('#decimal');

let newNumber = true;
let operator;
let pastNumber;

const pendingOperation = () => operator !== undefined;

const calculator = () => {
    if (pendingOperation()) {
        let result;
        newNumber = true;
        const currentNumber = parseFloat(dis.textContent.replace('.','').replace(',','.'))
        switch (operator) {
            case '+':
                result = pastNumber + currentNumber;  
                break;

            case '-':
                result = pastNumber - currentNumber;
                break;

            case '*':
                result = pastNumber * currentNumber;
                break;
        
            case '/':
                result = pastNumber / currentNumber;
                break;
            
            default:
                break;
        }
         
        display(result)
    } 
}

const display = (text) => {
    
    if (newNumber) {
        dis.textContent = text.toLocaleString('BR');
        newNumber = false
    }else{
        dis.textContent += text.toLocaleString('BR');
    }
}

const insertNumber = (event) => display(event.target.textContent);

numbers.forEach((number) => number.addEventListener('click', insertNumber));

const insertOperators = (event) => {
    
    if (!newNumber) {
        calculator()
        newNumber = true;
        operator = event.target.textContent;
        pastNumber = parseFloat(dis.textContent.replace('.','').replace(',','.'));
    }
}
    
operators.forEach((operator) => operator.addEventListener('click', insertOperators));

const iqualResult = () => {
    calculator();
    operator = undefined;
}

iqual.addEventListener('click', iqualResult);

const existsDecimal = () => dis.textContent.indexOf(',') !== -1;
const existsValor = () => dis.textContent.length > 0;

const decimalNumber = () => {
    
    if (!existsDecimal()) {
        if (!existsValor()) {
            display('0,');
        } else {
            display(',');
        } 
    } 
}
    
decimal.addEventListener('click', decimalNumber);

const clearCaracter = () => dis.textContent = dis.textContent.slice(0,-1);
    
backspace.addEventListener('click', clearCaracter);

const clearDisplay = () => dis.textContent = ""

clearDis.addEventListener('click', clearDisplay)

const clearCalculator = () => {
    clearDisplay()
    newNumber = true;
    operator = undefined;
    pastNumber = undefined;
}

clearCal.addEventListener('click', clearCalculator);

const invertNumber = () => {
    newNumber = true;
    display(dis.textContent * -1);
}

invert.addEventListener('click', invertNumber)

const calculatorKeyboard = {
    0: 'tecla0',                      // 0
    1: 'tecla1',                      // 1
    2: 'tecla2',                      // 2
    3: 'tecla3',                      // 3
    4: 'tecla4',                      // 4
    5: 'tecla5',                      // 5
    6: 'tecla6',                      // 6
    7: 'tecla7',                      // 7
    8: 'tecla8',                      // 8
    9: 'tecla9',                      // 9
    '/': 'operadorDividir',           // /
    '*': 'operadorMultiplicar',       // *
    '-': 'operadorSubtrair',          // -
    '+': 'operadorAdicionar',         // +
    '=': 'igual',                     // =
    Enter: 'igual',                   // Enter
    Backspace: 'backspace',           // <<
    c: 'limparDisplay',               // CE
    Escape: 'limparCalculo',          // C
    ',': 'decimal'                    // ,
};

const handleKeyPress = (event) => {

    const KEYS = event.key; 
    const allowedKey = () => Object.keys(calculatorKeyboard).indexOf(KEYS) !== -1;
    if(allowedKey()) document.getElementById(calculatorKeyboard[KEYS]).click();
}

document.addEventListener('keydown', handleKeyPress);