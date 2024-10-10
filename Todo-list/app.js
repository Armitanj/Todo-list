const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-tasks');


loadEventListeners();

function loadEventListeners() {

    document.addEventListener('DOMContentLoaded', getTasks);

    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', removeTask);

    clearBtn.addEventListener('click', clearTask);

    filter.addEventListener('keyup', filterTask);
}
//getTasks
function getTasks(e) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center';
        li.appendChild(document.createTextNode(task));
        const i = document.createElement('i');
        i.className = 'fas fa-times text-danger ml-auto delete-item';

        li.appendChild(i);
        taskList.appendChild(li);
    })
}

//add task

function addTask(e) {
    if (taskInput.value === '') {
        alert('!! Input is empty !!');
    } else {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center';
        li.appendChild(document.createTextNode(taskInput.value));

        const i = document.createElement('i');
        i.className = 'fas fa-times text-danger ml-auto delete-item';

        li.appendChild(i);
        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
        e.preventDefault();
    }

}
//ls
function storeTaskInLocalStorage(task) {
    // console.log(task);
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//removeTask
function removeTask(e) {
    if (e.target.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement);
        }
    }
}

//removeTaskFromLocalStorage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear Btn
function clearTask(e) {
    taskList.innerHTML = '';
    clearTasksFromLocalStorage();
}

//clearTasksFromLocalStorage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//filter
function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.list-group-item').forEach(function (task) {
        const item = task.textContent;

        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.classList.add("d-flex");
        } else {
            task.classList.remove("d-flex");
            task.style.display = 'none';
        }
    })
}





