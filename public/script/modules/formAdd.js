function makeCallback(fn, ...args) {
    return () => fn(...args)
}

function makeHandlerSubmitAdd(formAdd, taskLocalData, Task, callback) {
    return (evt) => {
        const inputTask = formAdd[0]
        const inputTags = formAdd[1]

        const newTask = new Task(inputTask.value)
        newTask.tags = inputTags.value

        inputTask.value = ""
        inputTags.value = ""

        taskLocalData.push(newTask)
        
        callback()
        
       evt.preventDefault()
    }
}