let getDates = function(startDate, endDate) {
    let dates = [],
        currentDate = startDate,
        addDays = function(days) {
          let date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
    while (currentDate <= endDate) {
      dates.push(currentDate.getDate() + '.' + currentDate.getMonth());
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };

//USERS
fetch("./users.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(users) {            
        users.forEach(e => {
            const taskField = document.querySelector('.task-fields');
            let taskItem = document.createElement('DIV');
            taskItem.classList.add('task-fields__item');

            let taskName = document.createElement('DIV');
            taskName.classList.add('task-fields__namespace');
            let paraName = document.createElement('P');

            let taskSpace = document.createElement('DIV');
            taskSpace.classList.add('task-fields__taskspace');

            paraName.textContent = e.surname + ' ' + e.firstName;
            taskField.appendChild(taskItem);
            taskItem.appendChild(taskName);
            taskItem.appendChild(taskSpace);
            taskName.appendChild(paraName);
        })
    })

//TASKS
fetch("./tasks.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(tasks) {
        tasks.forEach(e => {
            if(e.executor === null) {
                const backlog = document.querySelector('.backlog');

                let backlogCard = document.createElement('DIV');
                backlogCard.classList.add('backlog__card');

                let subj = document.createElement('P')
                subj.classList.add('backlog__header');

                subj.textContent = e.subject;
                backlog.appendChild(backlogCard);
                backlogCard.appendChild(subj);

                dropCards(backlogCard);
            } else {
                let datesWrapper = document.querySelector('.dates__wrapper');
                datesWrapper.classList.add('dates__wrapper');

                let dateItem = document.createElement('DIV');
                dateItem.classList.add('dates__item');

                let paraDate = document.createElement('P');
                paraDate.classList.add('dates__para');

                let sdate = new Date(2021,05,01);
                let edate = new Date(2021,06,30);

                let dates = getDates(sdate, edate);
                dates.forEach(e => {
                    paraDate.textContent = e;
                    datesWrapper.appendChild(dateItem);
                    dateItem.appendChild(paraDate);
                })
            }
        })
    })


//обработка перетаскивания карточки
let taskFields = document.querySelector('.task-fields');

function dropCards(card) {

    let currentDroppable = null;
    card.onmousedown = function(event) {
        let shiftX = event.clientX - card.getBoundingClientRect().left;
        let shiftY = event.clientY - card.getBoundingClientRect().top;
    
        card.style.position = 'absolute';
        card.style.zIndex = 1000;
        card.classList.add('wcard');
        taskFields.append(card);
    
        moveAt(event.pageX, event.pageY);
    
        function moveAt(pageX, pageY) {
            card.style.left = pageX - shiftX + 'px';
            card.style.top = pageY - shiftY + 'px';
        };
    
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
    
            card.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            card.hidden = false;
    
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
    
        card.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            card.onmouseup = null;
        };
    
    };
    card.ondragstart = function() {
        return false;
    };
}

function enterDroppable(elem) {
    
}

function leaveDroppable(elem) {
    
}




