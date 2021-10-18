const taskInput = document.querySelector('#task');
const taskList = document.querySelector('ul.collection')
const form = document.querySelector('#task-form');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

form.addEventListener('submit', addTask)
document.body.addEventListener('click', removeTask)
clearButton.addEventListener('click', clearTasks)
filter.addEventListener('keyup', filterTasks);
window.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage)

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks !== null) {
        tasks.forEach(function(task) {
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(task));
            const link = document.createElement('a');
            link.innerHTML = `<i class="fa fa-remove"></i>`;
            li.appendChild(link);
            taskList.appendChild(li);
        })
    }
}

function addTask(e) {
    e.preventDefault();

    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.innerHTML = `<i class="fa fa-remove"></i>`;
        li.appendChild(link);
        taskList.appendChild(li);
        addTaskToLocalStorage(taskInput.value);
        taskInput.value = '';
    }
}

function addTaskToLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if(e.target.className === 'fa fa-remove') {
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let taskRemoved = false;

    for(let i = tasks.length - 1; i >= 0; i--) {
        const task = tasks[i]
        if (taskItem.textContent === task && taskRemoved === false) {
            tasks.splice(i, 1)
            taskRemoved = true;
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
    e.preventDefault();
}

function filterTasks(e) {
    const filter = e.target.value.toLowerCase();
    console.log(filter);
    Array.from(taskList.children).forEach(function(task) {
        const taskText = task.textContent.toLowerCase();
        if (taskText.indexOf(filter) !== -1) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    })
}