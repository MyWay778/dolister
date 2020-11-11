"use strict"

let taskLocalData = []

//Local Storage synchronize
if ( localStorage.tasks ) {
    taskLocalData =  extractLocalStorageData("tasks")
}

const tabs = document.querySelectorAll(".panel__item")
const displayList = document.querySelector(".display-list")
//Tabs
//New tab
const handlerNew = makeHandlerTab(displayList, taskLocalData, true)
tabs[0].addEventListener("click", handlerNew, false)

//Old tab


//Form-Add
const formAdd = document.forms.formAdd
const saveToLocalStorageCallback = makeCallback(saveToLocalStorage, "tasks", taskLocalData)
const handlerSubmitAdd = makeHandlerSubmitAdd(formAdd, taskLocalData, Task, saveToLocalStorageCallback) 

formAdd.addEventListener("submit", handlerSubmitAdd, false)



