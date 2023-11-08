import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { SnackBarService } from 'src/app/services/shared/snackbar/snack-bar.service';

@Component({
  selector: 'app-departement-delete',
  templateUrl: './departement-delete.component.html',
  styleUrls: ['./departement-delete.component.scss']
})
export class DepartementDeleteComponent implements OnInit {

  constructor(private departementService: DepartementService,
    private snakBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: Departement,
    public dialogRef: MatDialogRef<DepartementDeleteComponent>) { }

  ngOnInit(): void {
  }
  deleteDepartement(id: number) {
    this.departementService.deleteDepartement(id)
      .subscribe(() => {
        this.departementService.departementListUpdated.emit();
        this.snakBarService.openSnackBar('Departement Deleted', 'Ok');
      })
  }
}
