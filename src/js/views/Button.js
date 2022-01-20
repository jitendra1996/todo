// import { todoLists } from "./base";
import { UpdateForm } from "./UpdateForm";

export class Button{
    constructor(rootEl,title='submit',id=''){
        this.rootEl = rootEl;
        this.title = title;
        this.id = id;
    }

    btnRender(){
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = this.title;
        this.rootEl.append(btn);

        if(this.title !== 'todo'){
            btn.addEventListener('click', e=>{
                e.preventDefault();
                if(this.title === 'Ok'){
                    this.rootEl.parentElement.style.display = 'none';
                    this.rootEl.parentElement.removeChild(btn.parentElement);
                }else if(this.title === 'delete'){

                    const newList = JSON.parse(localStorage.getItem('todoLists'));
                    const index = newList.findIndex(el=>el.id === this.id);
                    newList.splice(index,1);
                    localStorage.setItem('todoLists',JSON.stringify(newList));

                    this.rootEl.parentElement.removeChild(btn.parentElement);
                }else if(this.title === 'update'){
                    this.rootEl.parentElement.previousElementSibling.style.display = 'block';
                    const updateForm = new UpdateForm(btn.parentElement.children[0].textContent,btn.parentElement.id);
                    updateForm.renderUpdateForm();
                }else if(this.title === 'update task'){
                        document.getElementById(this.id).children[0].textContent = btn.parentElement.children[1].value;
                        const date = new Date();
                        document.getElementById(this.id).children[1].textContent = `${date.toLocaleString()}`;

                        const updateList = JSON.parse(localStorage.getItem('todoLists'));
                        let index = updateList.findIndex(el=> el.id === this.id);
                        updateList[index].task = btn.parentElement.children[1].value;
                        updateList[index].dateTime = `${date.toLocaleString()}`;
                        localStorage.setItem('todoLists',JSON.stringify(updateList));

                        btn.parentElement.children[1].value = '';
                        btn.parentElement.parentElement.style.display = 'none';
                        this.rootEl.parentElement.removeChild(btn.parentElement);
                }
            });
        }
    }
}