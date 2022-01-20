import { Alert } from "./Alert";
import { elements, todoLists } from "./base";
import { Button } from "./Button";
import { TodoList } from "./TodoList";

export class Form{
    constructor(rootEl,type,labelFor,labelTitle){
        this.rootEl = rootEl;
        this.type = type;
        this.labelFor = labelFor;
        this.labelTitle = labelTitle;
    }

    formRender(){
        const formEl = document.createElement('form');
        formEl.className = 'todo__form';
        const labelEl = document.createElement('label');
        labelEl.setAttribute('for',this.labelFor);
        labelEl.textContent = this.labelTitle;
        const inputEl = document.createElement('input');
        inputEl.setAttribute('type', this.type);
        inputEl.setAttribute('name',this.labelFor);
        inputEl.setAttribute('id',this.labelFor)
        const btn = new Button(formEl,'todo');
        formEl.append(labelEl);
        formEl.append(inputEl);
        this.rootEl.append(formEl);
        btn.btnRender();

        formEl.addEventListener('submit',e=>{
            e.preventDefault();
            if(inputEl.value.trim() ==='' && inputEl.value.length === 0){
                elements.backdrop.style.display = 'block';
                const popUp = new Alert(elements.backdrop,'invalid input!.' );
                popUp.renderAlert();
            }else{
                const id = `${Date.now()}`;
                const task = inputEl.value;
                const date = new Date();
                const dateTime = `${date.toLocaleString()}`;

                todoLists.push({
                    id : id,
                    task : task,
                    dateTime : dateTime
                });
        
                localStorage.setItem('todoLists', JSON.stringify(todoLists));

                const todo = new TodoList(this.rootEl);
                todo.todoRender(id,task,dateTime);
                inputEl.value = '';
            }
        })
    }
}