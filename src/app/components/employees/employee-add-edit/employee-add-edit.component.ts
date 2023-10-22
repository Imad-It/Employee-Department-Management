import { SnackBarService } from './../../../services/shared/snack-bar.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';
@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {
  employeeForm!: FormGroup;
  departementsList: string[] = ['Support', 'Marketing', 'Services', 'Human Resources'];

  constructor(
    private employeeService: EmployeeService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<EmployeeAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private formBuilder: FormBuilder) {

    this.employeeForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'gender': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'birthDate': ['', Validators.required],
      'phone': ['', Validators.required],
      'departement': ['', Validators.required]
    });
  }
  ngOnInit(): void {
    // this.departementsList = ['Support', 'Marketing', 'Services', 'Human Resources'];
    this.employeeForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.employeeForm.valid) {
      console.log('employeeForm' + this.employeeForm.value.lastName);
      if (this.data) {
        this.employeeService.updateEmployee(this.data.id, this.employeeForm.value).subscribe(() => {
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
