"use strict";

const getNumbers = () => {

    const number = document.querySelector("#number").value;
    const atualBase = document.querySelector("#selectBN").value;
    convertNumber(number, atualBase);
}

const convertNumber = (number, atualBase) => {

    const decimal = parseInt(number, atualBase);
    const binary = decimal.toString(2);
    const dec = decimal.toString(10);
    const octal = decimal.toString(8);
    const hexadecimal = decimal.toString(16);

    displayResult(binary, dec, octal, hexadecimal);
}

const displayResult = (binary, dec, octal, hexadecimal) => {

    document.querySelector("#binary").textContent = binary;
    document.querySelector("#octal").textContent = octal;
    document.querySelector("#decimal").textContent = dec;
    document.querySelector("#hexadecimal").textContent = hexadecimal;
}

document.querySelector("#button").addEventListener('click', getNumbers);