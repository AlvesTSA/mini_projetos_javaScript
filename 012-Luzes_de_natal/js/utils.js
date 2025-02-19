"use strict";

const Utils = {
    clear(container) {
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }
    },

    showMessage(message, duration = 3000) {
        let messageDiv = document.createElement("div");
        messageDiv.id = "dynamic-message";
        messageDiv.textContent = message;
    
        // Estilos iniciais
        Object.assign(messageDiv.style, {
            position: "fixed",
            top: "20px",
            right: "-300px",  // Começa fora da tela
            padding: "10px 20px",
            backgroundColor: "white",
            color: "black",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            fontSize: "16px",
            zIndex: "1000",
            transition: "right 0.5s ease-in-out"
        });
    
        document.body.appendChild(messageDiv);
    
        // Animação de entrada
        setTimeout(() => {
            messageDiv.style.right = "20px";
        }, 100);
    
        // Animação de saída
        setTimeout(() => {
            messageDiv.style.right = "-300px";
            setTimeout(() => messageDiv.remove(), 500); // Remove após a animação
        }, duration);
    }
};

export default Utils;
