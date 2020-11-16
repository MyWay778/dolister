"use strict"

let taskLocalData = []
let tempData = []
let local = true
let userId = "guest"

//Local Storage synchronize
if ( localStorage.tasks ) {
    taskLocalData =  extractLocalStorageData("tasks")
}

const tabs = document.querySelectorAll(".panel__item")
const displayList = document.querySelector(".display-list")
let currentActiveTab

//Tabs
//New tab
const handlerNew = makeHandlerTab(displayList, true)
handlerNew()
currentActiveTab = handlerNew
tabs[0].addEventListener("click", handlerNew, false)

//Old tab
const handlerOld = makeHandlerTab(displayList, taskLocalData, false)
tabs[1].addEventListener("click",handlerOld)

//Tags tab
const handlerTags = makeHandlerTabTags(displayList, taskLocalData)
tabs[2].addEventListener("click", handlerTags, false)

//Form-Add
const formAdd = document.forms.formAdd

const handlerSubmitAdd = makeHandlerSubmitAdd(formAdd, Task) 

formAdd.addEventListener("submit", handlerSubmitAdd, false)

//Additional click controller
const pageWrap = document.querySelector(".page-wrap")
const tabsHandlers = {
    "New": handlerNew,
    "Old": handlerOld,
    "Tag": handlerTags
}
pageWrap.addEventListener("click", evt => {
    
    if (evt.target.classList.contains("link_panel")) {                      
        currentActiveTab = tabsHandlers[evt.target.textContent.slice(0, 3)]
    }

    if( !evt.defaultPrevented) {
        const activeItem = document.querySelector(".task__item_active")
        
        if (evt.target.localName !== "input") {
            if (activeItem?.hidden) {
                activeItem.hidden = false
                activeItem.previousElementSibling.remove()
            } 
            inactivationItem(activeItem)
        }
        if (evt.target !== submitButton)
        modalMenu.hidden = true
    }
}, false)