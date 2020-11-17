function makeHandlerTab(displayList, reverse = false) {
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
            item.addEventListener("click", handlerTaskItem, false)
        })
    }
}


function makeHandlerTabTags(displayList) {
    return (evt) => {
        displayList.innerHTML = ""
        const tagTaskObject  = {
            "tag":[{"description":"some", "complited":false}]
        }
        const tagsData =  taskLocalData.reduce( (tagsObj, currentTask) => {
            currentTask._tags.forEach( task => {
                if (!(task in tagsObj)) {
                    tagsObj[task] = []
                }
                tagsObj[task].push({"description":currentTask.description, "completed":currentTask.completed})
            })
            return tagsObj
        },{})
        
        const ulTags = document.createElement("ul")
        ulTags.classList = "list-tags list_text" 
        const keysTags = Object.keys(tagsData)
        let index = 0

        keysTags.forEach( tag => {
            const liTag = document.createElement("li")
            liTag.className = "tag-row"

            const divTag = document.createElement("div")
            divTag.className = "tag-row__tag"
            divTag.textContent = tag
            const tasksTag = makeList(tagsData[tag], false, "list_theme_tag", "list__row_theme_tag")

            liTag.append(divTag)
            liTag.append(tasksTag)
            ulTags.append(liTag)
        })


        displayList.append(ulTags)

        const allItems = document.querySelectorAll(".task__item")
        let activeTaskItem = null
        const handlerTaskItem = makeHandlerTaskItem(activeTaskItem)

        allItems.forEach( item=> {
            item.addEventListener("click", handlerTaskItem, false)
        })


    }
}

/*function convertToTagsList(dataTasks) {

}*/

function makeList(data, reverse = false, styleList="list_theme_one", styleItem="list__row_theme_one") {
    const ol = makeElement("ol", "list list_text "+styleList)
    if( data ) {
        data.forEach( (task, i) => {
            
            const li = makeElement("li", "list__row "+styleItem)
            const div = makeElement("div", "task")
            const span = makeElement("span", "task__item")
           
            span.setAttribute("data-index", i)
    
            if (task.completed) {
                li.classList.add("list__row_done")
                span.classList.add("task__item_done")
            }

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
     
        inactivationItem(activeTaskItem)

        taskItem.classList.add("task__item_active")
        if (!taskItem.nextElementSibling) {
            if (task.firstElementChild.classList.contains("task__item_done")) {
                task.append(makeControls("done"))
            } else {
                task.append(makeControls("default"))
            }
        }
        activeTaskItem = taskItem
        evt.preventDefault()
    }
}

function inactivationItem(activeTaskItem) {
    activeTaskItem?.classList.remove("task__item_active")
    activeTaskItem?.nextElementSibling?.remove()
}