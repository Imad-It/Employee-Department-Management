import { SnackBarService } from '../../../services/shared/snackbar/snack-bar.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Departement } from 'src/app/models/departement.model';
import { Employee } from 'src/app/models/employee.model';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss'],
})
export class EmployeeAddEditComponent implements OnInit {
  employeeForm!: FormGroup;
  departementsList!: Observable<Departement[]>;

  constructor(
    private employeeService: EmployeeService,
    private departementService: DepartementService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<EmployeeAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private formBuilder: FormBuilder) {

    this.employeeForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'gender': ['male', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'birthDate': ['', Validators.required],
      'phone': ['', Validators.required],
      'departement': ['', Validators.required],
      // 'isManager': [false]
    });
  }
  ngOnInit(): void {
    this.departementsList = this.departementService.getDepartements();
    this.employeeForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.employeeForm.valid) {
      console.log('employeeForm' + this.employeeForm.value.lastName);
      if (this.data) {
        this.employeeService.updateEmployee(this.data.id, this.employeeForm.value)
          .subscribe(() => {
            this.employeeService.employeeListUpdated.emit();
            this.dialogRef.close();
            this.snackBarService.openSnackBar('Employee updated !!!', 'ok');
          })
      } else {
        this.employeeService.addEmployee(this.employeeForm.value)
          .subscribe(() => {
            this.employeeService.employeeListUpdated.emit();
            this.dialogRef.close();
            this.snackBarService.openSnackBar('New Employee Added !!!', 'ok');
          });
      }
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
