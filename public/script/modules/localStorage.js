function extractLocalStorageData(key){
    return JSON.parse(localStorage.getItem(key))
}
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}