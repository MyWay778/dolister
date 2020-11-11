function makeHandlerTab(displayList, taskLocalData, reverse = false) {
    return (evt) => {
        displayList.innerHTML = ""
        const content = makeList(taskLocalData, reverse)
        if( content ) {
            displayList.append(content)
        }

        const allItems = document.querySelectorAll(".task__item")
        let activeTaskItem = null
        const handlerTaskItem = makeHandlerTaskItem(activeTaskItem)

        allItems.forEach( item=> {
            item.addEventListener("click", handlerTaskItem,false)
        })
    }
}

function makeList(data, reverse = false) {
    const ol = makeElement("ol", "list list_theme_one list_text")
    if( data ) {
        data.forEach( task => {
            const li = makeElement("li", "list__row list__row_theme_one")
            const div = makeElement("div", "task")
            const span = makeElement("span", "task__item")

            addText(span, task.description)
    
            div.append(span)
            li.append(div)
            if (reverse) {
                ol.prepend(li)
                ol.reversed = true
            } else {
                ol.append(li)
            }   
        })
        return ol
    }
}

function makeElement(tag, classes) {
    const element = document.createElement(tag)
    element.className = classes
    return element
}

function addText(tag, text) {
    tag.textContent = text
}

function makeHandlerTaskItem(activeTaskItem) {
    return evt => {
        const taskItem = evt.target
        const task = taskItem.parentElement
     
        activeTaskItem?.classList.remove("task__item_active")
        activeTaskItem?.nextElementSibling.remove()

        taskItem.classList.add("task__item_active")
        if (!taskItem.nextElementSibling) {
            task.append(makeControls("default"))
        }
        activeTaskItem = taskItem

    }
}



function makeControls(config = "default") {
    const configs = {
        "default": ["done","edit","delete"]
    }
    const div = document.createElement("div")
    div.className = "controls controls_theme_one"

    configs[config].forEach( buttonClass => {
        const span = document.createElement("span")
        span.className = "controls__button button"
        span.classList.add(`controls__button_${buttonClass}`)

        div.append(span)
    })
    return div
}