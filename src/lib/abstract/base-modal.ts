import {MatDialogRef} from "@angular/material/dialog";

export abstract class BaseModal{
    title: string;

    protected constructor(protected dialogRef: MatDialogRef<BaseModal>) {}
}
