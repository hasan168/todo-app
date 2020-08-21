// UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

// load items
loadItems();

// call event listeners
eventListener();

function eventListener() {
    //submit event
    form.addEventListener('submit', addNewItem);

    // delete an item
    taskList.addEventListener('click', deleteItem);

    // delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}

// get items from Local Storage 
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set item to Local Storage
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

// delete item from LS
function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text) {
    //create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    // add a to li
    li.appendChild(a);

    // add li to ul
    taskList.appendChild(li);
}

// add new item
function addNewItem(event) {

    let inputValue = input.value.trim();
    if (inputValue === '') {
        alert('Bir iş yazınız');
    } else {

        // create item
        createItem(inputValue);

        // save to LS
        setItemToLS(inputValue);

        // clear input
        input.value = '';
    }
    event.preventDefault();
}

//delete an item
function deleteItem(event) {
    if (event.target.className === 'fas fa-times') {
        if (confirm('Silmek İstediğinize Emin misiniz?')) {
            event.target.parentElement.parentElement.remove();

            // delete item from LS
            deleteItemFromLS(event.target.parentElement.parentElement.textContent);
        }
    }
    event.preventDefault();
}

// delete all items
function deleteAllItems(event) {

    // all delete different way
    //taskList.innerHTML = '';

    if (confirm('Tüm İşleri Silmek İstediğinize Emin misiniz?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }

    event.preventDefault();
}