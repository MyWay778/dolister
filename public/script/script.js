"use strict"
const tabs = document.querySelectorAll(".panel__item")
const displayList = document.querySelector(".display-list")
let taskLocalData = []

//Local Storage synchronize

if ( localStorage.tasks ) {
    taskLocalData =  extractLocalStorageData("tasks")
}
//Tabs
tabs.forEach( tab => {
    if (tab.textContent.includes("New")) {
        tab.addEventListener("click", handlerNew, false)
    }
})

//Form-Add
const formAdd = document.forms.formAdd
formAdd.addEventListener("submit", handlerSubmit, false)

function handlerSubmit(evt) {
    const inputTask = formAdd.inputTask
    const inputTags = formAdd.inputTags
    const newTask = {
        "owner":"guest", 
        "description": "", 
        "tags": [], 
        "completed": "false"
    }

    newTask.description = inputTask.value
    newTask.tags = inputTags.value ? inputTags.value.replace(/(\s*,+\s*)|(\s+)/g," ").split(" ") : ["none"]
    
    taskLocalData.push(newTask)

    saveToLocalStorage("tasks", taskLocalData)
   evt.preventDefault()
}



