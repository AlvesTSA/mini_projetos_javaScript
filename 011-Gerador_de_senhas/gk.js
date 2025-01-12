// "use strict"

const getStringFiltered = (fil) => {
    const allCaracters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:\'",.<>?/`~\\';
    return Array.from(allCaracters)
        .filter(char => fil.includes(char)).join('');
}

const displayPassword = (password) => document.querySelector("#password").textContent = password;

const passwordGenerator = (filteredCharacters) => {
    const len = document.querySelector("#length").value;
    if (len == 0) {
        alert(`Informe a quantidade de caracteres`);
    }
    let password = ''; 

    for (let i = 0; i < len; i++) {
        const index = Math.floor(Math.random() * filteredCharacters.length);
        password += filteredCharacters[index];
    }
    displayPassword(password);
}

function applyFilters() {
    const selectedFilters = Array.from(
        document.querySelectorAll('input[name="selectC"]:checked')
    ).map((checkbox) => checkbox.value); // Obtem os valores dos checkboxes marcados
    
    let filteredCharacters = '';
    let filtered = '';
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/`~\\';
   
    // Aplica os filtros de forma iterativa
    selectedFilters.forEach((filterType) => {
        
        switch (filterType) {
        case "check1":
            filtered = getStringFiltered(uppercaseLetters);
            
            break;
        case "check2":
            filtered = getStringFiltered(lowercaseLetters);
            break;
        case "check3":
            filtered = getStringFiltered(numbers);
            break;
        case "check4":
            filtered = getStringFiltered(symbols);
            break;
        default:
            break;
        }

        filteredCharacters += filtered;
    });

    if (filteredCharacters == '') {
        alert(`Nenhum tipo de caractere foi informado`);
    }
    passwordGenerator(filteredCharacters); 
}

const copyText = () => {
    const result = document.querySelector("#password").textContent;

    navigator.clipboard.writeText(result)
    .then(() => {
        alert("Texto copiado para a área de transferência!");
    })
    .catch(err => {
        console.error("Erro ao copiar o texto: ", err);
    });
}
document.querySelector("#copy").addEventListener('click', copyText);
document.querySelector("#gKey").addEventListener('click', applyFilters);

