"use strict";
import Storage from "./storage.js";
import Utils from "./utils.js";

const UI = {
    elements: {
        lightSizeModal: document.querySelector("#lightSize"),
        lightColorModal: document.querySelector("#lightColor"),
        lightIntensityModal: document.querySelector("#lightIntensity"),
        blinkSpeedModal: document.querySelector("#blinkSpeed"),

        lightSizePanel: document.querySelector("#lightSizePanel"),
        lightColorPanel: document.querySelector("#lightColorPanel"),
        lightIntensityPanel: document.querySelector("#lightIntensityPanel"),
        blinkSpeedPanel: document.querySelector("#blinkSpeedPanel"),

        turnOnOff: document.querySelector("#turnOnOff"),
        buttonQrow: document.querySelector("#buttonQrow"),
        buttonSave: document.querySelector("#buttonSave"),
        btnCloseModal: document.querySelector("#btnCloseModal"),
        select: document.getElementById("selectProject"),
        delete: document.getElementById("delete"),
        cancel: document.getElementById("buttonCancel"),
        selectQrow: document.getElementById("selectQrow"),
    },
    
    renderProjectNames() {
        const dbLightProject = Storage.getProjects();
        Utils.clear(this.elements.select);
        this.elements.select.innerHTML = `<option value="">Novo projeto</option>`;
        dbLightProject.forEach(project => {
            let option = `
                <option value="${project.name}">${project.name}</option>
            `;
            this.elements.select.insertAdjacentHTML("beforeend", option);
        });
    }
};

export default UI;
