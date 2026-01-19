const SetLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
}

const GetLocalStorage = (value) => {
    return JSON.parse(localStorage.getItem(value));
}

export {
    SetLocalStorage,
    GetLocalStorage
}