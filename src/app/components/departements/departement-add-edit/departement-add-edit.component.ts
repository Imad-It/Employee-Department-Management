import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { SnackBarService } from 'src/app/services/shared/snackbar/snack-bar.service';

@Component({
  selector: 'app-departement-add-edit',
  templateUrl: './departement-add-edit.component.html',
  styleUrls: ['./departement-add-edit.component.scss']
})
export class DepartementAddEditComponent implements OnInit {
  departementForm!: FormGroup;

  constructor(private departementServcie: DepartementService,
    public dialogRef: MatDialogRef<DepartementAddEditComponent>,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Departement) {
    this.departementForm = this.formBuilder.group({
      'name': ['', Validators.required],
      // 'manager': ['', Validators.required],
      'description': ['', Validators.required]
    })
  }

  ngOnInit(): void {
    console.log('data' + this.data);
    this.departementForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.departementForm.valid) {
      if (this.data) {
        this.departementServcie.updateDepartement(this.data.id, this.departementForm.value)
          .subscribe(() => {
            this.departementServcie.departementListUpdated.emit();
            this.dialogRef.close();
            this.snackBarService.openSnackBar('Departement updated !!!', 'ok');
          })
      } else {
        this.departementServcie.addDepartement(this.departementForm.value).subscribe(() => {
          this.departementServcie.departementListUpdated.emit();
          this.dialogRef.close();
          this.snackBarService.openSnackBar('New Department Added !!!', 'ok');
        })
      }
    }
  }



}
