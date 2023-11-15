import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeptEmployeeState } from 'src/app/models/dept-employee-state.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  deptEmployeeStates$!: Observable<DeptEmployeeState[]>;
  view: [number, number] = [1000, 370];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  gradient: boolean = false;
  isDoughnut: boolean = true;

  legendPosition: string = 'below';

  colorScheme: any = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };

  constructor(private dashboardService: DashboardService) { Object.assign(this, {}) }

  ngOnInit(): void {
    this.deptEmployeeStates$ = this.dashboardService.combineDepartmentsWithEmployeeCounts();
  }


  onActivate(data: Event): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: Event): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onSelect(data: Event): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
