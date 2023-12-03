import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartementSummary } from 'src/app/models/departementSummary.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';


@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit {

  deptEmployeeStates$!: Observable<DepartementSummary[]>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.deptEmployeeStates$ = this.dashboardService.combineDepartmentsWithEmployeeCounts();
  }

}
