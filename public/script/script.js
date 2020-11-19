'use strict'

let taskLocalData = []
let tempData = []
let local = true
let userId = 'guest'

//Local Storage synchronize
if (localStorage.tasks) {
    taskLocalData = extractLocalStorageData('tasks')
}

const tabs = document.querySelectorAll('.panel__item')
const displayList = document.querySelector('.display-list')
let currentActiveTab

//Tabs
//New tab
const handlerNew = makeHandlerTab(displayList, true)
handlerNew()
currentActiveTab = handlerNew
tabs[0].addEventListener('click', handlerNew, false)

//Old tab
const handlerOld = makeHandlerTab(displayList, false)
tabs[1].addEventListener('click', handlerOld)

//Tags tab
const handlerTags = makeHandlerTabTags(displayList)
tabs[2].addEventListener('click', handlerTags, false)

//Add aside functional for responsive design
const mql = window.matchMedia('(min-width: 980px)')
const addSection = document.querySelector('.aside-add')
const panel = document.querySelector('.panel')

if (!mql.matches) {
    tabs[3].addEventListener('click', handlerAddPanel)
}
mql.addEventListener('change', handlerAddSide)

function handlerAddSide(e) {
    if (e.matches) {
        tabs[3].removeEventListener('click', handlerAddPanel)
        displayList.hidden = false
        addSection.style.display = 'block'
    } else {
        tabs[3].addEventListener('click', handlerAddPanel)
        addSection.style.display = 'none'
    }
}

function handlerAddPanel(e) {
    displayList.hidden = true
    addSection.style.display = 'block'
}
//Burger functional
const burger = document.querySelector('.burger')
const menu = document.querySelector('.menu')

burger.addEventListener('click', evt => {
    menu.classList.toggle('menu_invisible')
})

//Rename panel elements
const mobMql = window.matchMedia('(min-width: 760px)')
textPanelChanger(mobMql.matches)

mobMql.addEventListener('change', evt => {
    textPanelChanger(evt.matches)
})

function textPanelChanger(change) {
    if (change) {
        tabs[0].firstElementChild.textContent = 'Newest'
        tabs[1].firstElementChild.textContent = 'Oldest'
    } else {
        tabs[0].firstElementChild.textContent = 'New'
        tabs[1].firstElementChild.textContent = 'Old'
    }
}
// Form-Add
const formAdd = document.forms.formAdd
const handlerSubmitAdd = makeHandlerSubmitAdd(formAdd, Task)

formAdd.addEventListener('submit', handlerSubmitAdd, false)

//Additional click controller
const pageWrap = document.querySelector('.page-wrap')
const tabsHandlers = {
    New: handlerNew,
    Old: handlerOld,
    Tag: handlerTags,
}
pageWrap.addEventListener(
    'click',
    evt => {
        if (evt.target.classList.contains('link_panel')) {
            currentActiveTab = tabsHandlers[evt.target.textContent.slice(0, 3)]
        }

        if (!evt.defaultPrevented) {
            const activeItem = document.querySelector('.task__item_active')

            if (evt.target.localName !== 'input') {
                if (activeItem?.hidden) {
                    activeItem.hidden = false
                    activeItem.previousElementSibling.remove()
                }
                inactivationItem(activeItem)
            }
            if (evt.target !== submitButton) modalMenu.hidden = true
        }
    },
    false
)
