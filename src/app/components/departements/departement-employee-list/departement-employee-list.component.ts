import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { delay, forkJoin } from 'rxjs';
import { Departement } from 'src/app/models/departement.model';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';


@Component({
  selector: 'app-departement-employee-list',
  templateUrl: './departement-employee-list.component.html',
  styleUrls: ['./departement-employee-list.component.scss'],
})
export class DepartementEmployeeListComponent implements OnInit {

  dataSource!: MatTableDataSource<Employee>;
  departement!: Departement;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
    'manager'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.departement = data.departement;
    this.dataSource = new MatTableDataSource<Employee>(data.list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.employeeService.employeeListUpdated.subscribe(() => this.refreshEmployeeList());
  }
  refreshEmployeeList() {
    this.employeeService.getEmployeesByDepartement(this.data.departement.name).pipe(delay(600))
      .subscribe((res: Employee[]) => {
        this.data.list = res
        this.dataSource = new MatTableDataSource<Employee>(this.data.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  changeManager(employee: Employee) {
    forkJoin([
      this.employeeService.deactivatePreviousManager(employee),
      this.employeeService.activateCurrentManager(employee)
    ]).subscribe(([deactivatedManager, activatedManager]) => {
      if (deactivatedManager && activatedManager) {
        this.employeeService.employeeListUpdated.emit();
      }
    });
  }

}
