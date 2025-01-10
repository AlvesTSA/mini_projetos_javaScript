"use strict";

const modal = document.querySelector("#modal");

const openModal = () => {
    modal.classList.add('active');
    const modalText = document.querySelector("#modalText");
    modalText.textContent = "Novo cliente";
}

const closeModal = () => {
    clearFilds();
    modal.classList.remove('active');
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbClient')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem('dbClient', JSON.stringify(dbClient));

//CREATE
const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
}

//READ
const readClient = () => getLocalStorage();

//UPDATE
const updateClient = (index, client) => {
    const dbClient = getLocalStorage();
    dbClient[index] = client;
    setLocalStorage(dbClient);
}

//DELETE
const deleteClient = (index) => {
    const dbClient = getLocalStorage();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
}

// funcionalidades de interação do usário
const createRow = (client, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" id="edit-${index}" class="button green">Editar</button>
            <button type="button" id="delete-${index}" class="button red">Excluir</button>
        </td>
    `;
    document.querySelector("#tableClient>tbody").appendChild(tr);
}

const fullFilds = (client) => {
    document.querySelector("#nome").value = client.name;
    document.querySelector("#email").value = client.email;
    document.querySelector("#celular").value = client.celular;
    document.querySelector("#cidade").value = client.cidade;
    document.querySelector("#nome").dataset.index = client.index;

}

const editData = (index) => {
    const client = readClient()[index];
    client.index = index;
    fullFilds(client);
    openModal()
    upDateTable()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-');
        if (action == 'edit') {
            editData(index);
            const modalText = document.querySelector("#modalText");
            modalText.textContent = "Editar cliente";
        }else{
            const client = readClient()[index];
            const response = confirm(`Deseja realmente excluir o cliente ${client.name} ?`);
            if (response) {
                deleteClient(index);
                upDateTable()
            }
        }
    } 
}

const clearRow = () => {
    const tableBody = document.querySelector("#tableClient>tbody");
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.lastChild);
    }
}

const upDateTable = () => {
    clearRow();
    const dbClient = readClient();
    dbClient.forEach(createRow);
}

const cancel = () => {
    closeModal();
    document.querySelector("#nome").dataset.index = "new";
}

const isValidFields = () => {
    return document.querySelector("#form").reportValidity();
}

const clearFilds = () => {
   const filds = document.querySelectorAll(".modal-field");
   filds.forEach(fild => fild.value = '');
}

const saveData = () => {
    if (isValidFields()) {
        const client = {
            name : document.querySelector("#nome").value,
            email : document.querySelector("#email").value,
            celular : document.querySelector("#celular").value,
            cidade : document.querySelector("#cidade").value,
        }
        const index = document.querySelector("#nome").dataset.index;
        if (index == 'new') {
            createClient(client);
            closeModal();
            upDateTable();
        }else{
            updateClient(index, client);
            closeModal();
            upDateTable();
            document.querySelector("#nome").dataset.index = "new";
        } 
    }
}
upDateTable();

// eventos
document.querySelector("#cadastrarCliente").addEventListener('click', openModal);
document.querySelector("#modalClose").addEventListener('click', closeModal);
document.querySelector("#salvar").addEventListener('click', saveData);
document.querySelector("#cancelar").addEventListener('click', cancel);
document.querySelector("#tableClient>tbody").addEventListener('click', editDelete);

