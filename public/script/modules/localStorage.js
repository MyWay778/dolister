function extractLocalStorageData(key){
    return JSON.parse(localStorage.getItem(key))
}

function saveToLocalStorage(key, data) {
    if (local) {
        localStorage.setItem(key, JSON.stringify(data))
    }
}
