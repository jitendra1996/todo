// import { todoLists } from "./base";
import { Button } from "./Button";

export class TodoList{
    constructor(rootEl){
        this.rootEl = rootEl;
    }

    todoRender(id,task,dateTime){
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo__container';
        todoDiv.id = id;
        const taskPara = document.createElement('p');
        taskPara.className = 'todo__container--task';
        taskPara.textContent = task;
        const timeDatePara = document.createElement('p');
        timeDatePara.className = "todo__container--timeDate";
        timeDatePara.textContent = dateTime;



        const delBtn = new Button(todoDiv,'delete',todoDiv.id);
        const updateBtn = new Button(todoDiv,'update',todoDiv.id);

        todoDiv.append(taskPara);
        todoDiv.append(timeDatePara);
        updateBtn.btnRender();
        delBtn.btnRender();

        this.rootEl.append(todoDiv);
    }
}