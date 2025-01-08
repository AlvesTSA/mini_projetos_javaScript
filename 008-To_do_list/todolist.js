"use strict";

const toDoList = document.querySelector('#todoList');

const getBank = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBank = (bank) => localStorage.setItem('todoList', JSON.stringify(bank));

const createItem = (text, status, index) => {

    const item = document.createElement('label');
    item.classList.add('todo__item');

    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div> ${text} </div>
        <input type="button" value="X" class="delete__button" data-index=${index}>
    `;

    toDoList.appendChild(item);
}

const render = () => {

    clearTask();
    const bank = getBank();
    bank.forEach((task, index) => createItem(task.tarefa, task.status, index));
}

const clearTask = () => {

    while (toDoList.firstChild) {
        toDoList.removeChild(toDoList.lastChild);
    }
}

const addTask = (event) => {

    const text = document.querySelector('#newTask');

    if (event.key === 'Enter') {

        const bank = getBank();
        bank.push({"tarefa" :  text.value, "status" : ""});
        setBank(bank);
        render();
        text.value = '';
    }  
}

const removeTask = (index) => {

    const bank = getBank();
    bank.splice(index, 1);
    setBank(bank);
    render();
}

const updateItem = (index) => {

    const bank = getBank();
    bank[index].status = bank[index].status === '' ? 'checked' : '';
    setBank(bank);
    render();
}

const clickItem = (event) => {

    const element = event.target;

    if (element.type === 'button') {
        const index = element.dataset.index;
        removeTask(index);
    }
    else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        updateItem(index);
    }
}

render();
document.addEventListener('keydown', addTask);
toDoList.addEventListener('click', clickItem);
