const datesContainer = document.querySelector('.dates__container');
const datesWrapper = document.querySelector('.dates__wrapper');

let startDate = new Date(2021-05-01);
let endDate = new Date(2021-07-01);

let dateArray = [];
let dateItem = document.createElement('DIV');
datesWrapper.appendChild(dateItem.classList.add('dates__item'));

while(startDate < endDate) {
    startDate.setDate(startDate.getDate() + 1);
}

let cardBacklog = document.querySelector('.backlog__card');
let taskFields = document.querySelector('.task-fields');


//обработка перетаскивания карточки
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
