import { elements } from "./base";
import { Button } from "./Button";

export class UpdateForm{
    constructor(previousTask, idOfPreviousElment){
        this.rootEl = elements.backdrop;
        this.previousTask = previousTask;
        this.id = idOfPreviousElment;
    }

    renderUpdateForm(){
        const formEl = document.createElement('form');
        formEl.className = 'update__container';
        const labelEl = document.createElement('label');
        labelEl.setAttribute('for','updateTask');
        labelEl.textContent = 'change task';
        const inputEl = document.createElement('input');
        inputEl.setAttribute('type','text');
        inputEl.setAttribute('name','updateTask');
        inputEl.setAttribute('id','updateTask') ;
        inputEl.value = this.previousTask;

        const updateTaskBtn = new Button(formEl,'update task',this.id);
        
        formEl.append(labelEl);
        formEl.append(inputEl);
        updateTaskBtn.btnRender();
        this.rootEl.append(formEl);
    }
}