function makeCallback(fn, ...args) {
    return () => fn(...args)
}

function makeHandlerSubmitAdd(formAdd, Task) {
    return async (evt) => {
        const inputTask = formAdd[0]
        const inputTags = formAdd[1]

        const newTask = new Task(inputTask.value)
        newTask.tags = inputTags.value
        newTask.owner = userId

        inputTask.value = ""
        inputTags.value = ""

        taskLocalData.push(newTask)
        evt.preventDefault()
        if (local) {
            saveToLocalStorage("tasks", taskLocalData)
        } else {
            let sendTask = await fetch(`/todos/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newTask)
            })
            console.log(sendTask.status)
        }   
        
        currentActiveTab()                      
       console.log(tempData)
    }
}