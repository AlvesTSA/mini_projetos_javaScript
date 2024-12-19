"use strict";

const images = [
    {'id':'1', 'url':'./img/chrono.jpg'},
    {'id':'2', 'url':'./img/inuyasha.jpg'},
    {'id':'3', 'url':'./img/ippo.png'},
    {'id':'4', 'url':'./img/tenchi.jpg'},
    {'id':'5', 'url':'./img/tenjhotenge.jpg'},
    {'id':'6', 'url':'./img/yuyuhakusho.jpg'},
];

const containerItens = document.querySelector('#container-items');

const loadImages = (images, container) => {
    images.forEach(image => {
        container.innerHTML += `
            <div class='item'>
                <img src='${image.url}'/>
            </div>
        `;
    });
};

loadImages(images, containerItens);

let itens = document.querySelectorAll('.item');

const previous = () => {
    containerItens.appendChild(itens[0]);
    itens = document.querySelectorAll('.item');
};

const next = () => {
    containerItens.prepend(itens[itens.length - 1]);
    itens = document.querySelectorAll('.item');
};

// Evento de clique
document.querySelector('#previous').addEventListener('click', previous);
document.querySelector('#next').addEventListener('click', next);

// Evento global de teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        previous();
    } else if (event.key === 'ArrowRight') {
        next();
    }
});
