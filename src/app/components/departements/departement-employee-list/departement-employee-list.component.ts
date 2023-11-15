import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-departement-employee-list',
  templateUrl: './departement-employee-list.component.html',
  styleUrls: ['./departement-employee-list.component.scss']
})
export class DepartementEmployeeListComponent implements OnInit {

  dataSource = new MatTableDataSource<Employee>();
  departement!: string;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.departement = data.departement;
    this.dataSource.data = data.list;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

  }


}
