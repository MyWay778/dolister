function makeControls(config = "default") {
    const configs = {
        "default": ["done","edit","delete"],
        "done": ["hide", "undo", "delete"],
        "edit": ["save", "undo", "hide"]
    }
    const div = document.createElement("div")
    div.className = "controls controls_theme_one"

    configs[config].forEach( buttonClass => {
        const span = document.createElement("span")
        span.className = "controls__button button"
        span.classList.add(`controls__button_${buttonClass}`)

        div.append(span)
    })
    div.addEventListener("click", controlsHandler, false)
    return div
}

function controlsHandler(evt) {
    if ( evt.target.className.includes("done") ) {
        const taskItem = evt.target.parentElement.previousElementSibling
        toggleDoneClassTaskItem(taskItem)

        toggleCompletedTaskItem(taskItem, "index", taskLocalData)

        if (currentActiveTab == handlerTags) {
            currentActiveTab()
        }

    } else if (evt.target.className.includes("undo")) {
        const taskItem = evt.target.parentElement.previousElementSibling
        
        if (taskItem.classList.contains("task__item_done")) {
            toggleDoneClassTaskItem(taskItem)
            console.log(taskItem)
            toggleCompletedTaskItem(taskItem, "index", taskLocalData)
        }
        if (currentActiveTab == handlerTags) {
            currentActiveTab()
        }
    } else if (evt.target.className.includes("edit") ) {
        const taskItem = evt.target.parentElement.previousElementSibling

        const inputEditTask = document.createElement("input")
        inputEditTask.className = "form-add__input task__input"
        inputEditTask.value = taskItem.textContent

        const task = taskItem.parentElement
        task.prepend(inputEditTask)
        taskItem.hidden = true
        inputEditTask.select()                                                  

        const controls = task.querySelector(".controls")
        controls.replaceWith(makeControls("edit"))
        

        evt.preventDefault()

    } else if (evt.target.className.includes("save") ) {
        const task = evt.target.closest(".task")

        const input = task.firstElementChild
        const taskItem = input.nextElementSibling
        
        if (input.value !== taskItem.textContent) {
            taskItem.textContent = input.value 
            taskLocalData[taskItem.dataset.index].description = input.value
            
            if (local) {
                saveToLocalStorage("tasks", taskLocalData)
            } else {
                saveToDB(taskLocalData[taskItem.dataset.index]._id, input.value, "edit")
            }
        }
        if (currentActiveTab == handlerTags) {
            currentActiveTab()
        }
    } else if (evt.target.className.includes("delete") ) {
        const taskItem = evt.target.parentElement.previousElementSibling 
        let deleteItem

        if (currentActiveTab !== handlerTags) {
            deleteItem = taskLocalData[taskItem.dataset.index]
            taskLocalData.splice(taskItem.dataset.index, 1)
        } else {
            const textDeleteItem = taskItem.textContent
           
            taskLocalData.forEach( (task, i) => {
                if(task.description === textDeleteItem) {
                    deleteItem = taskLocalData[i]
                    taskLocalData.splice(i, 1)
                }
            })

            console.log(taskLocalData)
        }
        if (local){
            saveToLocalStorage("tasks", taskLocalData)
        } else {
            saveToDB(deleteItem._id, undefined, "delete")
        }

        currentActiveTab()
    }
}

function toggleDoneClassTaskItem(taskItem) {
    taskItem.classList.toggle("task__item_done")
    taskItem.closest(".list__row").classList.toggle("list__row_done")
}

async function saveToDB(id, newDescription="", action) {
    let editRequest = await fetch(`todos/${action}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({"id": id, "description": newDescription })
    })
    if(editRequest.status !== 200) {
        console.log("some edit error")
    }
}

async function toggleCompletedTaskItem(taskItem, dataName, data) {
    const indexTask = taskItem.dataset[dataName]
    data[indexTask].completed = !data[indexTask].completed
    if (local) {
        saveToLocalStorage("tasks", taskLocalData)
    } else {
        let doneRequest = await fetch("todos/done", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"id": data[indexTask]._id, "completed":data[indexTask].completed })
        })
        if(doneRequest.status !== 200) {
            console.log("some done error")
        }
    }
    
}