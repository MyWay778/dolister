"use strict"
const signup = document.getElementById("signup")
const login = document.getElementById("login")
const confirmInput = document.getElementById("confirm")
const modalMenu = document.querySelector(".modal")
const submitButton = document.querySelector(".modal-menu__submit")
const formLogin = document.forms[0]

modalMenu.hidden = true

login.addEventListener("click", handlerLogin)

function handlerLogin(evt) {
    clearInputs()
    submitButton.value = "login"
    modalMenu.classList.remove("modal_signup")
    confirmInput.hidden = true
    confirmInput.required = false
    modalMenu.hidden = false
    evt.preventDefault()
}

signup.addEventListener("click", evt => {
    if (evt.target.textContent === "Sign up") {
        clearInputs()
        modalMenu.classList.add("modal_signup")
        submitButton.value = "signup"
        confirmInput.hidden = false
        confirmInput.required = true
        modalMenu.hidden = false
    } else if (evt.target.textContent === "Log out") {
        login.textContent = "Log in"
        login.className = "link link_menu"
        login.addEventListener("click", handlerLogin)
        evt.target.textContent = "Sign up"
        taskLocalData = tempData
        local = true
        userId = "gest"
        currentActiveTab()
    }
    
    evt.preventDefault()
}) 

confirmInput.addEventListener("input", evt => {
    if (!(confirmInput.hidden) && formLogin[1].value !== confirmInput.value) {
        confirmInput.classList.add("invalid")
        formLogin[3].disabled = true
        submitButton.style.backgroundColor = "grey"
    } else {
        confirmInput.classList.remove("invalid")
        formLogin[3].disabled = false
        submitButton.style.backgroundColor = ""
    }
})

modalMenu.addEventListener("click", evt => {
    if (evt.target !== submitButton) evt.preventDefault()
})

formLogin.addEventListener("submit", handlerSubmit)

async function handlerSubmit(evt) {
    evt.preventDefault()
    const action =evt.target.lastElementChild.value
    const user = {"username": formLogin[0].value, "password": formLogin[1].value, "action": action}

    let response = await fetch("/user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
    if (response.status === 200) {
        let result = await response.json()

        if (result.action === "signup") {
            const message = document.createElement("span")
            message.className = "modal-message"
            message.textContent = result.message
            modalMenu.prepend(message)
        } else if (result.action === "login") {
            login.textContent = result.username
            login.className = "logined"
            modalMenu.hidden = true
            login.removeEventListener("click", handlerLogin)
            signup.textContent = "Log out"

            tempData = taskLocalData.slice()
            taskLocalData = result.tasks
            local = false
            userId = result.username
            currentActiveTab()
        }
    } else {
        const message = document.createElement("span")
        message.className = "modal-message"
        message.style.color = "red" 
        message.textContent = "Incorrect login or password"
        modalMenu.prepend(message)
    }
}

function clearInputs() {
    formLogin[0].value = ""
    formLogin[1].value = ""
    formLogin[2].value = ""
    submitButton.style.backgroundColor = ""
    confirmInput.classList.remove("invalid")
    formLogin[3].disabled = false
    if (modalMenu.firstElementChild.localName === "span") modalMenu.firstElementChild.remove()
}