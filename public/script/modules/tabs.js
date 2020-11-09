function handlerNew(evt) {
    displayList.innerHTML = ""

    const content = makeList(taskLocalData, true)
    if( content ) {
        displayList.append(content)
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