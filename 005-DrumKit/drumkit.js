"use strict";

const sounds = {
    "A": "boom.wav",
    "S": "clap.wav",
    "D": "hihat.wav",
    "F": "kick.wav",
    "G": "openhat.wav",
    "H": "ride.wav",
    "J": "snare.wav",
    "K": "tink.wav",
    "L": "tom.wav"
};

const creatDiv = (text) => {
    const div = document.createElement('div');
    div.classList.add('key');
    div.textContent = text;
    div.id = text;
    document.querySelector('#container').appendChild(div)
}

const displaySounds = (sounds) => {

    Object.keys(sounds).forEach(text => {
        creatDiv(text);
    })
}

const enableSounds = (event) => {
    
    let letter
    if (event.type === 'click') {
        letter = event.target.id;
    }else{
        letter = event.key.toUpperCase();
    }
    
    const letterAllowed = sounds.hasOwnProperty(letter);

    if (letterAllowed) {
        addEffect(letter);
        playSounds(letter);
        removeEffect(letter);
    }  
}

const playSounds = (letter) => {

    const audio = new Audio(`./sounds/${sounds[letter]}`);
    audio.play()
}

const addEffect = (letter) => {

    document.getElementById(letter).classList.toggle('active');
}

const removeEffect = (letter) => {
    
    const removeActive = () => {
       document.getElementById(letter).classList.remove('active');
    }
    
    document.getElementById(letter).addEventListener('transitionend', removeActive)
}

displaySounds(sounds);
document.querySelector('#container').addEventListener('click', enableSounds);
document.addEventListener('keydown', enableSounds)