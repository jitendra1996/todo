import { Button } from "./Button";

export class Alert{
    constructor(rootEl,msg){
        this.rootEl = rootEl;
        this.alertMsg = msg;
    }

    renderAlert(){
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alertPopUp';
        const p = document.createElement('p');
        p.textContent = this.alertMsg;
        p.className = 'alertPopUp__msg';
        const btn = new Button(alertDiv,'Ok');
        alertDiv.append(p);
        btn.btnRender();
        this.rootEl.append(alertDiv);
    }
}