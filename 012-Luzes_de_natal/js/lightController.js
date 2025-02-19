"use strict";
import Storage from "./storage.js";
import UI from "./ui.js";
import Utils from "./utils.js";

const LightController = {

    lights: [],
    selectedLight: null,
    isOn: false,
    isTrue: false,
    intensityValue: null,
    savedStyles: {},
    projects: {},
    id: null,
    elements: UI.elements,
    styles: null,

    init() {
        UI.renderProjectNames();
        this.bindEvents();
        this.disabledProperties();
    },

    bindEvents() {
        this.elements.lightSizeModal.addEventListener('input', () => {
            this.settingSizeModal(this.selectedLight);
            this.saveProperties();
        });
        this.elements.lightColorModal.addEventListener('input', () => {
            this.settingColorModal(this.selectedLight);
            this.saveProperties();
        });
        this.elements.lightIntensityModal.addEventListener('input', () => {
            this.settingIntensityModal(this.selectedLight);
            this.saveProperties();
        });
        this.elements.blinkSpeedModal.addEventListener('input', () => {
            this.settingBlinkSpeedModal(this.selectedLight);
            this.saveProperties();
        });

        this.elements.lightSizePanel.addEventListener('input', () => {
            this.lights.forEach(light => this.settingSizePanel(light));
            this.saveProperties();
        });
        this.elements.lightColorPanel.addEventListener('input', () => {
            this.lights.forEach(light => this.settingColorPanel(light));
            this.saveProperties();
        });
        this.elements.lightIntensityPanel.addEventListener('input', () => {
            this.lights.forEach(light => this.settingIntensityPanel(light));
            this.saveProperties();
        });
        this.elements.blinkSpeedPanel.addEventListener('input', () => {
            this.lights.forEach(light => this.settingBlinkSpeedPanel(light));
            this.saveProperties();
        });

        this.elements.buttonQrow.addEventListener('click', () => this.insertRow());
        this.elements.turnOnOff.addEventListener('click', () => {
            this.isOn ? this.turnOff() : this.turnOn();
            this.isOn = !this.isOn;
        });
        this.elements.btnCloseModal.addEventListener('click', () => this.closeModal());
        this.elements.buttonSave.addEventListener('click', () => this.updateProjectDb());
        this.elements.select.addEventListener('change', () => this.openProject());
        this.elements.delete.addEventListener('click', () => {
            if (this.elements.select.value !== "") {
                this.deleteProjectDb();
                UI.renderProjectNames();
            }
            else {
                Utils.showMessage("Selecione um projeto para deletar.");
            }
        });
        this.elements.cancel.addEventListener('click', () => this.cancelProject());
    },

    addNameProjectDb() {
        let projectName = prompt("Informe o nome do projeto:");
        this.projects = { name: projectName, savedStyles: this.savedStyles };
        Storage.addProject(this.projects);
        UI.renderProjectNames();
    },

    updateProjectDb(){
        const dbLightProject = Storage.getProjects();
        console.log(this.elements.select.value);

        if (this.elements.select.value !== "") {
            dbLightProject.forEach(project => {
                if (this.elements.select.value === project.name) {
                    project.savedStyles = this.savedStyles;
                    Storage.updateDbProject(dbLightProject.indexOf(project), project);
                    Utils.showMessage("Projeto atualizado com sucesso!");
                }
            });
            UI.renderProjectNames();
        }else{
            this.addNameProjectDb();
        }
    },
    
    deleteProjectDb() {
        if (!confirm("Tem certeza que deseja excluir o projeto?")) {
            return;
        }
        const dbLightProject = Storage.getProjects();
        dbLightProject.forEach(project => {
        if (this.elements.select.value === project.name) {
            Storage.deleteDbProject(dbLightProject.indexOf(project));
            Utils.showMessage("Projeto deletado com sucesso!");
        }
        });
        UI.renderProjectNames();
    },

    cancelProject() {
        const rowContainer = document.querySelector("#lights-container");
        if (this.elements.select.value === "") {
            Utils.clear(rowContainer);
            this.elements.buttonQrow.disabled = false;
            this.selectQrow.disabled = false;
            if (this.elements.turnOnOff.textContent = "desligar") {
                this.turnOff(); 
            }
        }else{
            this.openProject();
        }
    },

    openProject() {
        const dbLightProject = Storage.getProjects();
        const rowContainer = document.querySelector("#lights-container");

        if (rowContainer.hasChildNodes()) {
            Utils.clear(rowContainer);
            this.elements.buttonQrow.disabled = true;
        }
        if (this.elements.select.value === "") {
            Utils.clear(rowContainer);
            this.elements.buttonQrow.disabled = false;
            this.turnOff();
            return;
        }
        dbLightProject.forEach(project => {
            if (this.elements.select.value === project.name) {
                this.createRowLight(Object.keys(project.savedStyles).length / 7);
                this.restoreAllProperties(project.savedStyles);
            }
        });
        this.turnOn();
    },

    saveProperties() {
        this.lights.forEach(light => {
            this.id = light.getAttribute("id");
            this.styles = window.getComputedStyle(light);
            this.savedStyles[this.id] = {
                backgroundColor: this.styles.backgroundColor,
                boxShadow: light.style.boxShadow,
                animation: this.styles.animation,
                width: this.styles.width,
                height: this.styles.height
            };
        });
    },

    restoreAllProperties(savedStyles) {
        Object.keys(savedStyles).forEach(id => {
            let light = document.getElementById(id);
            if (light) {
                light.style.backgroundColor = savedStyles[id].backgroundColor;
                light.style.animation = savedStyles[id].animation;
                light.style.boxShadow = savedStyles[id].boxShadow;
                light.style.width = savedStyles[id].width;
                light.style.height = savedStyles[id].height;
            }
        });
    },

    turnOn() {
        const rowContainer = document.querySelector("#lights-container");
        if (!rowContainer.hasChildNodes() || this.lights.length === 0) {
            Utils.showMessage("Adicione luzes antes de ligar.");
            return;
        }
        this.elements.turnOnOff.textContent = "desligar";
        this.elements.turnOnOff.style.backgroundColor = "red";
        this.elements.turnOnOff.style.color = "#ffffff";
        this.onLight();
        if (window.getComputedStyle(this.lights[0]).animationName === "none") {
            this.restoreAllProperties(this.savedStyles);
            this.disabledProperties();
        } else {
            this.saveProperties();
            this.disabledProperties();  
        }  
    },

    turnOff() {
        this.elements.turnOnOff.textContent = "ligar";
        this.elements.turnOnOff.style.backgroundColor = "green";
        this.elements.turnOnOff.style.color = "#ffffff";
        this.lights.forEach(light => {
            light.style.animation = "none";
            light.style.boxShadow = "none";
        });
        this.onLight();
        this.disabledProperties();
    },

    onLight() {
        this.lights.forEach(light => light.classList.toggle('active'));
    },

    insertRow() {
        this.selectQrow = document.querySelector("#selectQrow");
        this.createRowLight(selectQrow.value);
        this.elements.buttonQrow.disabled = true;
        selectQrow.disabled = true;
        
    },

    createRowLight(qrow) {
        const rowContainer = document.querySelector("#lights-container");
        for (let rowIndex = 0; rowIndex < qrow; rowIndex++) {
            let rowHTML = `<div class="lights-row">`;
            for (let colIndex = 0; colIndex < 7; colIndex++) {
                rowHTML += `<div class="light" id="luz-${rowIndex}-${colIndex}"></div>`;
            }
            rowHTML += `</div>`;
            rowContainer.insertAdjacentHTML("beforeend", rowHTML);
        }
        this.updateLights();
        this.saveProperties();
    },

    updateLights() {
        this.lights = document.querySelectorAll(".light");
        this.lights.forEach(light => {
            light.addEventListener('click', () => {
                if (this.elements.turnOnOff.textContent === "desligar") {
                    this.openModal(light)
                }else{
                    Utils.showMessage("Ligue as luzes antes de configurar.");
                }
            });
        });
    },

    openModal(light) {
        const modal = document.querySelector("#lightModal");
        this.selectedLight = light;
        modal.style.display = "flex";
        this.settingBlinkSpeedModal(light);
        this.settingIntensityModal(light);
        this.settingSizeModal(light);
        this.settingColorModal(light);
        this.saveProperties();
    },

    closeModal() {
        document.querySelector("#lightModal").style.display = "none";
        this.selectedLight = null;
    },

    disabledProperties() {
        if (this.elements.turnOnOff.textContent === "desligar") {
            this.elements.lightSizeModal.disabled = false;
            this.elements.lightColorModal.disabled = false;
            this.elements.lightIntensityModal.disabled = false;
            this.elements.blinkSpeedModal.disabled = false;

            this.elements.lightSizePanel.disabled = false;
            this.elements.lightColorPanel.disabled = false;
            this.elements.lightIntensityPanel.disabled = false;
            this.elements.blinkSpeedPanel.disabled = false;
            
        } else {
            this.elements.lightSizeModal.disabled = true;
            this.elements.lightColorModal.disabled = true;
            this.elements.lightIntensityModal.disabled = true;
            this.elements.blinkSpeedModal.disabled = true;

            this.elements.lightSizePanel.disabled = true;
            this.elements.lightColorPanel.disabled = true;
            this.elements.lightIntensityPanel.disabled = true;
            this.elements.blinkSpeedPanel.disabled = true;
        }
    },

    //CONFIGURAÇÕES

    //Modal
    settingBlinkSpeedModal(selectedLight) {
        if (this.elements.turnOnOff.textContent === "desligar") {
            selectedLight.style.animation = `blink ${this.elements.blinkSpeedModal.value / 1000}s infinite alternate`;
        }
    },
    
    settingSizeModal(selectedLight) {
        selectedLight.style.width = `${this.elements.lightSizeModal.value}px`;
        selectedLight.style.height = `${this.elements.lightSizeModal.value}px`;
    },
    
    settingColorModal(selectedLight) {
        selectedLight.style.backgroundColor = this.elements.lightColorModal.value;
        if (this.elements.turnOnOff.textContent === "desligar") {
            selectedLight.style.boxShadow = `0 0 ${this.elements.lightIntensityModal.value}px ${this.elements.lightIntensityModal.value / 3}px ${this.elements.lightColorModal.value}`; 
        }
    },
    
    settingIntensityModal(selectedLight) {
        if (this.elements.turnOnOff.textContent === "desligar") {
            selectedLight.style.boxShadow = `0 0 ${this.elements.lightIntensityModal.value}px ${this.elements.lightIntensityModal.value / 3}px ${this.elements.lightColorModal.value}`;
            this.settingColorModal(selectedLight);
        }
    },
    
    //Panel
    settingBlinkSpeedPanel(allLights) {
        if (this.elements.turnOnOff.textContent === "desligar") {
            allLights.style.animation = `blink ${this.elements.blinkSpeedPanel.value / 1000}s infinite alternate`;
        }
    },
    
    settingSizePanel(allLights) {
        allLights.style.width = `${this.elements.lightSizePanel.value}px`;
        allLights.style.height = `${this.elements.lightSizePanel.value}px`;
    },
    
    settingColorPanel(allLights) {
        allLights.style.backgroundColor = this.elements.lightColorPanel.value;
        if (this.elements.turnOnOff.textContent === "desligar") {
            allLights.style.boxShadow = `0 0 ${this.elements.lightIntensityPanel.value}px ${this.elements.lightIntensityPanel.value / 3}px ${this.elements.lightColorPanel.value}`;
        } 
    },
    
    settingIntensityPanel(allLights) {
        if (this.elements.turnOnOff.textContent === "desligar") {
            allLights.style.boxShadow = `0 0 ${this.elements.lightIntensityPanel.value}px ${this.elements.lightIntensityPanel.value / 3}px ${this.elements.lightColorPanel.value}`;
            this.settingColorPanel(allLights);
        }
    }
};

export default LightController;
