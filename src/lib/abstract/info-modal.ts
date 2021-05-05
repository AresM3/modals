import {BaseModal} from "./base-modal";
import {BaseModel, ModelManager} from "@m3team/paged-tables";
import {MatDialogRef} from "@angular/material/dialog";
import {AfterViewInit, ElementRef} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {HasManagerModal} from "../interfaces";

export abstract class InfoModal<T extends BaseModel> extends BaseModal implements AfterViewInit, HasManagerModal<T> {
    body: ElementRef;
    classes = ['col-xl-3', 'col-lg-4', 'col-md-6', 'col-sm-12'];
    protected _manager: ModelManager<T>;

    protected constructor(dialogRef: MatDialogRef<InfoModal<T>>, public _model: T,
                          protected _fb: FormBuilder) {
        super(dialogRef);
        this._manager = this.instanceManager();
    }

    abstract instanceManager(): ModelManager<T>;

    getHtml(): string[] {
        let html = [];
        let classes = '';
        this.classes.forEach(c => classes += c + ' ');
        this._manager.view()
            .forEach(h => html.push(`<div class="${classes}"><b>${h.name}:</b> ${h.value}</div>`))
        return html;
    }

    ngAfterViewInit() {
        this.getHtml().forEach(html => this.body.nativeElement.insertAdjacentHTML('beforeend', html));
    }

}
