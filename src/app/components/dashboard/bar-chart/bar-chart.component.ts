import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartementSummary } from 'src/app/models/departementSummary.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  deptEmployeeStates$!: Observable<DepartementSummary[]>;


  view: [number, number] = [1000, 370];

  // options
  legendTitle: string = 'Departments';
  legendTitleMulti: string = 'Months';
  legendPosition: any = 'right'; // ['right', 'below']
  legend: boolean = true;

  xAxis: boolean = false;
  yAxis: boolean = true;

  yAxisLabel: string = 'Employees';
  // xAxisLabel: string = 'Products';
  xAxisLabel: string = 'Employees';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;

  xAxisTicks: any[] = ['Genre 1', 'Genre 2', 'Genre 3', 'Genre 4', 'Genre 5', 'Genre 6', 'Genre 7']
  yAxisTicks: any[] = [2, 4, 6, 8, 10, 12, 14, 16]

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = false;
  colorScheme: any = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };
  schemeType: any = 'ordinal'; // 'ordinal' or 'linear'

  activeEntries: any[] = ['book']
  barPadding: number = 5
  tooltipDisabled: boolean = false;

  yScaleMax: number = 9000;

  roundEdges: boolean = true;
  constructor(private dashboardService: DashboardService) {
    Object.assign(this, {})
  }

  ngOnInit(): void {
    this.deptEmployeeStates$ = this.dashboardService.combineDepartmentsWithEmployeeCounts();
  }

  onSelect(event: any) {
    console.log('Item clicked', JSON.parse(JSON.stringify(event)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  formatString(input: string): string {
    return input.toUpperCase()
  }

  formatNumber(input: number): number {
    return input
  }

}
