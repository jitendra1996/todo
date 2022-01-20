const root = document.getElementById('root');
const backdrop = document.getElementById('backdrop');
backdrop.style.display = 'none';

let val = JSON.parse(localStorage.getItem('todoList'));
let todoList = [...val];
console.log(todoList);

todoList.forEach(el => {

});


class Button {
    constructor(btnTitle, btnId, EltoAppend) {
        this.btnTitle = btnTitle;
        this.EltoAppend = EltoAppend;
        this.btnId = btnId;
    }

    btnRender() {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.id = this.btnId;
        btn.textContent = this.btnTitle;
        this.EltoAppend.append(btn);
    }
}


class Form {
    constructor(labelFor, labelTitle, inputType, btnTitle, btnId, EltoAppend) {
        this.labelFor = labelFor;
        this.labelTitle = labelTitle;
        this.inputType = inputType;
        this.btnTitle = btnTitle;
        this.btnId = btnId;
        this.EltoAppend = EltoAppend;
    }

    formRender() {
        const formEl = document.createElement('form');
        formEl.className = 'form__container';

        const labelEl = document.createElement('label');
        labelEl.setAttribute('for', this.labelFor);
        labelEl.textContent = this.labelTitle;
        formEl.append(labelEl);

        const inputEl = document.createElement('input');
        inputEl.setAttribute('type', this.inputType);
        inputEl.setAttribute('name', this.labelFor);
        inputEl.setAttribute('id', this.labelFor);
        formEl.append(inputEl);

        const todoBtn = new Button(this.btnTitle, this.btnId, formEl);
        todoBtn.btnRender();

        this.EltoAppend.append(formEl);
    }
}

class TodoListContainer {
    constructor(id, inputValue, dateTime, EltoAppend) {
        this.id = id;
        this.inputValue = inputValue;
        this.dateTime = dateTime;
        this.EltoAppend = EltoAppend;
    }

    todoListRender() {
        const listDivEl = document.createElement('div');
        listDivEl.className = 'task__container';
        listDivEl.id = this.id;
        const contentParaEl = document.createElement('p');
        contentParaEl.textContent = this.inputValue;
        const dateParaEl = document.createElement('p');
        dateParaEl.textContent = this.dateTime;
        const delBtn = new Button('delete', 'delete', listDivEl);
        delBtn.btnRender();
        const updateBtn = new Button('update', 'update', listDivEl);
        updateBtn.btnRender();

        delBtn.addEventListener('click', e => {
            e.preventDefault();
            console.log('del clicked.');
            // todoList = todoList.filter(el=>el.id !== delBtn.parentElement.id);
            // listDivEl.remove(delBtn.parentElement);

            // localStorage.setItem('todoList', JSON.stringify(todoList));
        });

        updateBtn.addEventListener('click', e => {
            e.preventDefault();
            backdrop.style.display = 'block';
            const newForm = document.createElement('form');
            const newLabel = document.createElement('label');
            newLabel.setAttribute('for', 'updateTask');
            newLabel.className = 'label';
            newLabel.textContent = 'change task';
            const newInput = document.createElement('input');
            newInput.className = 'input__box';
            newInput.setAttribute('type', 'text');
            newInput.setAttribute('name', 'updateTask');
            newInput.setAttribute('id', 'updateTask');
            const selectedTodo = updateBtn.parentElement.id;
            let tempVal = document.getElementById(`${selectedTodo}`).children[0].textContent;
            newInput.value = document.getElementById(`${selectedTodo}`).children[0].textContent;
            const updateTaskBtn = document.createElement('button');
            updateTaskBtn.className = 'btn';
            updateTaskBtn.textContent = 'update task';

            newForm.append(newLabel);
            newForm.append(newInput);
            newForm.append(updateTaskBtn);
            backdrop.append(newForm);
            newInput.focus();

            newForm.addEventListener('submit', e => {
                e.preventDefault();
                if (newInput.value.trim() === '' || newInput.value.length === 0) {
                    document.getElementById(`${selectedTodo}`).children[0].textContent = tempVal;
                    newInput.value = '';
                    backdrop.removeChild(newForm);
                    backdrop.style.display = 'none';
                } else {
                    const newDate = new Date();
                    todoList.forEach(el => {
                        if (el.id === selectedTodo) {
                            el.task = newInput.value;
                            el.dateTime = `${newDate.toLocaleString()}`;
                        }
                    });

                    localStorage.setItem('todoList', JSON.stringify(todoList));

                    document.getElementById(`${selectedTodo}`).children[0].textContent = newInput.value;
                    document.getElementById(`${selectedTodo}`).children[1].textContent = `${newDate.toLocaleString()}`;
                    newInput.value = '';
                    backdrop.removeChild(newForm);
                    backdrop.style.display = 'none';
                    console.log(todoList);
                }
            });

        });
    }
}



class Createtodo {
    render() {
        const formContainer = new Form('todo', 'Enter task', 'text', 'todo', 'todo', root);
        formContainer.formRender();

        document.querySelector('.form__container').addEventListener('submit', e => {
            e.preventDefault();
            if (document.getElementById('todo').value.trim() === '' || document.getElementById('todo').value.length === 0) {
                const alertPara = document.createElement('p');
                alertPara.className = 'alert';
                alertPara.textContent = 'you didn\'t enter any task .';
                const alertBtn = document.createElement('button');
                alertBtn.className = 'btn';
                alertBtn.textContent = 'OK';

                backdrop.style.display = 'block';
                backdrop.append(alertPara);
                backdrop.append(alertBtn);

                alertBtn.addEventListener('click', e => {
                    e.preventDefault();
                    backdrop.removeChild(alertPara);
                    backdrop.removeChild(alertBtn);
                    backdrop.style.display = 'none';
                });
            } else {
                const date = new Date();
                let inputVal = document.getElementById('todo').value;
                const createtodo = new TodoListContainer(`${Date.now()}`, inputVal, `${date.toLocaleString()}`, root);
                createtodo.todoListRender();
            }
        });
    }
}    



const createtodo = new Createtodo();
createtodo.render();
