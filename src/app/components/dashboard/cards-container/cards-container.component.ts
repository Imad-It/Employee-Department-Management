import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeptEmployeeState } from 'src/app/models/dept-employee-state.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';


@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit {

  deptEmployeeStates$!: Observable<DeptEmployeeState[]>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.deptEmployeeStates$ = this.dashboardService.combineDepartmentsWithEmployeeCounts();
  }

}
