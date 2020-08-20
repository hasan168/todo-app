// UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
const items = ['item 1', 'item 2', 'item 3'];// test data

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
    btnDeleteAll.addEventListener('click', deletAllItems);
}

function loadItems() {
    items.forEach(function (item) {
        createItem(item);
    });
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

    if (input.value === '') {
        alert('Bir iş yazınız');
    } else {

        // create item
        createItem(input.value);

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
        }
    }
    event.preventDefault();
}

// delete all items
function deletAllItems(event) {

    // all delete different way
    //taskList.innerHTML = '';

    if (confirm('Silmek İstediğinize Emin misiniz?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

    event.preventDefault();
}