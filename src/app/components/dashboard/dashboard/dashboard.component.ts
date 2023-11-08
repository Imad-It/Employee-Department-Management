import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DepartementService } from 'src/app/services/departement/departement.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  departements$!: Observable<string[]>;
  constructor(private departementService: DepartementService) { }

  ngOnInit(): void {
    this.departements$ = this.departementService.getdepartements()
      .pipe(
        map(res => res.map(dep => dep.name))
      );
  }

}
