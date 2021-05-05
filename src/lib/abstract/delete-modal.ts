import {BaseModal} from "./base-modal";
import {BaseModel, ModelManager} from "@m3team/paged-tables";
import {MatDialogRef} from "@angular/material/dialog";
import {HasManagerModal, TwoButtonsModal} from "../interfaces";
import {OnInit} from '@angular/core';

export abstract class DeleteModal<T extends BaseModel> extends BaseModal implements HasManagerModal<T>, OnInit, TwoButtonsModal {
    yesLabel = "Sì";
    noLabel = "No";
    _manager: ModelManager<T>;

    protected constructor(dialogRef: MatDialogRef<DeleteModal<T>>, protected data: T) {
        super(dialogRef);
        this._manager = this.instanceManager();
    }

    abstract instanceManager(): ModelManager<T>;

    ngOnInit() {
        this.title = `Elimina ${this._manager.objectName}?`
    }

    onNoClick() {this.dialogRef.close({delete: false});}

    onYesClick() {this.dialogRef.close({delete: true});}
}
