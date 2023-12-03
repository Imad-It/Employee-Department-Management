import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EmployeeAddEditComponent } from '../employee-add-edit/employee-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { SpinnerService } from 'src/app/services/shared/spinner/spinner.service';
import { delay } from 'rxjs/operators';
import { SpinnerComponent } from '../../spinner/spinner.component';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})


export class EmployeeListComponent implements OnInit {

  dataSource!: MatTableDataSource<Employee>;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
    'departement',
    'manager',
    'action'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public employeeService: EmployeeService,
    public dialog: MatDialog,
    public spinnerService: SpinnerService) {
    this.spinnerService.hide();
  }

  ngOnInit(): void {
    this.refreshEmployeeList();
    this.employeeService.employeeListUpdated.subscribe(() => {
      this.refreshEmployeeList();
    })
  }
  refreshEmployeeList() {
    this.spinnerService.show();
    const dialogRef = this.dialog.open(SpinnerComponent);
    this.employeeService.getEmployees().pipe(delay(600))
      .subscribe(res => {
        this.dataSource = new MatTableDataSource<Employee>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        dialogRef.close();
        this.spinnerService.hide();
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddForm(): void {
    const dialogRef = this.dialog.open(EmployeeAddEditComponent, {
    });
  }
  openDetailDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDetailComponent, {
      data: employee
    });
  }

  openEditForm(employee: Employee): void {
    const dialogRef = this.dialog.open(EmployeeAddEditComponent, {
      data: employee
    });
  }
  openDeleteDialog(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeDeleteComponent, {
      data: employee
    });
  }
}
