// UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');

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

// add new item
function addNewItem(event) {

    if (input.value === '') {
        alert('Bir iş yazınız');
    } else {

        //create li
        const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-secondary';
        li.appendChild(document.createTextNode(input.value));

        // create a
        const a = document.createElement('a');
        a.classList = 'delete-item float-right';
        a.setAttribute('href', '#');
        a.innerHTML = '<i class="fas fa-times"></i>';

        // add a to li
        li.appendChild(a);

        // add li to ul
        taskList.appendChild(li);

        // clear input
        input.value = '';
    }
    event.preventDefault();
}

//delete an item
function deleteItem(event) {
    if (confirm('Silmek İstediğinize Emin misiniz?')) {
        if (event.target.className === 'fas fa-times') {
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