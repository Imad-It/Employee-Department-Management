import { Observable } from 'rxjs';
import { count } from 'rxjs/operators';
import { EmployeeService } from './../../../services/employee/employee.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() departement!: string;
  counter$!: Observable<number>;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.counter$ = this.employeeService.getEmployeesByDepartement(this.departement)
      .pipe(count());
  }

}
