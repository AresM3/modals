import {BaseModal} from "./base-modal";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {OnInit} from "@angular/core";
import {TwoButtonsModal} from "../interfaces";
import {HasManagerModal} from "../interfaces";
import {BaseModel, ModelKeyBinding, ModelManager} from "@m3team/paged-tables";

export abstract class FormModal<T extends BaseModel> extends BaseModal implements OnInit, TwoButtonsModal, HasManagerModal<T> {
    isEdit: boolean;
    formGroup: FormGroup;
    noLabel: string = "Annulla";
    yesLabel: string;
    _manager: ModelManager<T>;
    title: string;


    get f() {return this.formGroup.controls;}

    protected constructor(dialogRef: MatDialogRef<FormModal<T>>, protected fb: FormBuilder, protected data: T) {
        super(dialogRef);
        this._manager = this.instanceManager();
        this.isEdit = !!data;
    }

    ngOnInit(): void {
        this.yesLabel = !!this.isEdit ? "Modifica" : "Crea";
        this.title = `${this.yesLabel} ${this._manager.objectName}`;
        this.formGroup = this._manager.form(this.isEdit);
        this.formGroup.patchValue(this._manager.set())
    }


    abstract instanceManager(): ModelManager<T>;

    onNoClick(): void {
        this.dialogRef.close();
    }

    getModel(): T{
        return this.cleanValues(this._manager.get(this.f));
    }

    onYesClick(): void {
        this.dialogRef.close(this.getModel());
    };

    protected cleanValues(obj: T): T {
        Object.keys(obj).forEach(a => {
            if (typeof obj[a] == 'string') {
                obj[a] = obj[a] != '' ? obj[a] : undefined;
            }
        });
        return obj;
    }

    isPresent(k: ModelKeyBinding): boolean{
        return (this.isEdit && (k.edit == undefined || k.edit)) || (!this.isEdit && (k.create == undefined || k.create))
    }

}
