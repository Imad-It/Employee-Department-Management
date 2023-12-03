import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Departement } from 'src/app/models/departement.model';
import { DepartementManagerInfo } from 'src/app/models/departementManagerInfo.model';

@Component({
  selector: 'app-departement-detail',
  templateUrl: './departement-detail.component.html',
  styleUrls: ['./departement-detail.component.scss']
})
export class DepartementDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DepartementDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DepartementManagerInfo) { }

  ngOnInit(): void {
  }

}
