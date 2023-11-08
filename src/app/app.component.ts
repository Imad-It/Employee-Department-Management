import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee/employee.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeAddEditComponent } from './components/employees/employee-add-edit/employee-add-edit.component';
import { Observable } from 'rxjs';
import { SpinnerService } from './services/shared/spinner/spinner.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // isLoading$!: Observable<boolean>;
  constructor(public dialog: MatDialog, public spinnerService: SpinnerService) { }
  ngOnInit(): void {
    // this.isLoading$ = this.spinnerService.getLoadingStatus();
  }
  // openAddForm(): void {
  //   const dialogRef = this.dialog.open(EmployeeAddEditComponent, {
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }
}
