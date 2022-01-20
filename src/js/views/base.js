export const elements = {
    root : document.getElementById('root'),
    backdrop : document.getElementById('backdrop'),
    list :document.getElementsByClassName('list')
};


export let todoLists = JSON.parse(localStorage.getItem('todoLists')) || [] ;