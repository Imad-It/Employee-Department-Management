import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee/employee.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeAddEditComponent } from './components/employees/employee-add-edit/employee-add-edit.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((res) => { console.log(res) })
  }
  openAddForm(): void {
    const dialogRef = this.dialog.open(EmployeeAddEditComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
