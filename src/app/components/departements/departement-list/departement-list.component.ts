import { Departement } from '../../../models/departement.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { delay } from 'rxjs/operators';

import { DepartementService } from 'src/app/services/departement/departement.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { DepartementAddEditComponent } from '../departement-add-edit/departement-add-edit.component';
import { DepartementDetailComponent } from '../departement-detail/departement-detail.component';
import { DepartementDeleteComponent } from '../departement-delete/departement-delete.component';
import { DepartementEmployeeListComponent } from '../departement-employee-list/departement-employee-list.component';
import { SpinnerService } from 'src/app/services/shared/spinner/spinner.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-departement-list',
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.scss']
})
export class DepartementListComponent implements OnInit {
  departements!: Departement[]
  displayedColumns: string[] = ['Id', 'Name', 'Manager', 'action'];
  dataSource !: MatTableDataSource<Departement>;
  length!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private departementService: DepartementService,
    private employeeService: EmployeeService,
    public spinnerService: SpinnerService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.spinnerService.hide();
  }

  ngOnInit(): void {
    this.refreshDepartementList();
    this.departementService.departementListUpdated
      .subscribe(() => {
        this.refreshDepartementList();
      })
  }

  refreshDepartementList() {
    this.spinnerService.show();
    const dialogRef = this.dialog.open(SpinnerComponent);
    this.departementService.getdepartements()
      .pipe(delay(600))
      .subscribe(res => {
        this.dataSource = new MatTableDataSource<Departement>(res);
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
    const dialogRef = this.dialog.open(DepartementAddEditComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDetailDialog(departement: Departement) {
    const dialogRef = this.dialog.open(DepartementDetailComponent, {
      data: departement
    })
  }

  openEditForm(departement: Departement) {
    const dialogRef = this.dialog.open(DepartementAddEditComponent, {
      data: departement
    })
  }

  openDeleteDialog(departement: Departement) {
    const dialogRef = this.dialog.open(DepartementDeleteComponent,
      { data: departement })
  }

  openListDialog(departement: string) {
    this.employeeService.getEmployeesByDepartement(departement)
      .subscribe((res) => {
        const dialogRef = this.dialog.open(DepartementEmployeeListComponent,
          { data: { list: res, departement: departement } })
      })
  }


}
