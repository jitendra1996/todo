import { elements, todoLists } from "./views/base";
import { Button } from "./views/Button";
import { Form } from "./views/Form";
import { TodoList } from "./views/TodoList";

console.log(todoLists);

const taskInputForm = new Form(elements.root,'text','task','Enter task');
taskInputForm.formRender();


window.onload = function(){
    const todoList = new TodoList(elements.root);
    todoLists.forEach(el=>{
        todoList.todoRender(el.id,el.task,el.dateTime);
    });
}


elements.backdrop.addEventListener('click',e=>{
    Array.from(elements.backdrop.children).forEach(el=>{
        elements.backdrop.removeChild(el);
    })
    elements.backdrop.style.display = 'none';
})