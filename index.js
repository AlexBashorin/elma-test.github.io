const datesContainer = document.querySelector('.dates__container');
const datesWrapper = document.querySelector('.dates__wrapper');

let startDate = new Date(2021-05-01);
let endDate = new Date(2021-07-01);

// let dateArray = [];
// let dateItem = document.createElement('DIV');
// datesWrapper.appendChild(dateItem.classList.add('dates__item'));

// while(startDate < endDate) {
//     startDate.setDate(startDate.getDate() + 1);
// }



//обработка перетаскивания карточки
let cardBacklog = document.querySelector('.backlog__card');
let taskFields = document.querySelector('.task-fields');

let currentDroppable = null;
cardBacklog.onmousedown = function(event) {
    let shiftX = event.clientX - cardBacklog.getBoundingClientRect().left;
    let shiftY = event.clientY - cardBacklog.getBoundingClientRect().top;

    cardBacklog.style.position = 'absolute';
    cardBacklog.style.zIndex = 1000;
    taskFields.append(cardBacklog);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        cardBacklog.style.left = pageX - shiftX + 'px';
        cardBacklog.style.top = pageY - shiftY + 'px';
    };

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        cardBacklog.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        cardBacklog.hidden = false;

        if(!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable');
        if(currentDroppable != droppableBelow) {
            if(currentDroppable) {
                leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if(currentDroppable) {
                enterDroppable(currentDroppable);
            }
        }
    };

    document.addEventListener('mousemove', onMouseMove);

    cardBacklog.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        cardBacklog.onmouseup = null;
    };

};

function enterDroppable(elem) {
    
}

function leaveDroppable(elem) {
    
}

cardBacklog.ondragstart = function() {
    return false;
};



//USERS
let requestUsers = 'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/users';
let requestU = new XMLHttpRequest();
requestU.open('GET', requestUsers);
requestU.responseType = 'json';
requestU.send();

requestU.onload = function() {
    let users = requestU.response;
    placeUsers(users);
}

const taskField = document.querySelector('.task-fields');
let taskItem = document.createElement('DIV');
taskItem.classList.add('task-fields__item');

function placeUsers(jsonObj) {
    let taskName = document.createElement('DIV');
    taskName.classList.add('task-fields__namespace');
    let paraName = document.createElement('P');
    paraName.textContent = jsonObj['surname'] + jsonObj['firstName'];

    taskField.appendChild(taskItem);
    taskItem.appendChild(taskName);
    taskName.appendChild(paraName);
}


// let usersData = JSON.parse(users, function(key, value) {
//     if(key == 'id') return Number;
//     return value;
// });

//TASKS
let requestTasks = 'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks';
let requestT = new XMLHttpRequest();
requestT.open('GET', requestTasks);
requestT.responseType = 'json';
requestT.send();

requestT.onload = function() {
    let tasks = requestT.response;
    placeTasks(tasks);
}

function placeTasks() {
    
}
// let tasksData = JSON.parse(tasks, function(key, value){
//     if(key == 'creationDate' || key == 'planStartDate' || key == 'planEndDate' || key == 'endDate') return new Date(value);
//     return value;
// });
