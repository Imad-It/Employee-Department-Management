import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SnackBarService } from 'src/app/services/shared/snackbar/snack-bar.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.scss']
})
export class EmployeeDeleteComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    private snakBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    public dialogRef: MatDialogRef<EmployeeDeleteComponent>) { }

  ngOnInit(): void {
  }
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employeeService.employeeListUpdated.emit();
      this.dialogRef.close();
      this.snakBarService.openSnackBar('Employee Deleted !!!', 'Ok');
    })
  }

}
