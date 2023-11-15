import { Employee } from './../../models/employee.model';
import { Injectable } from '@angular/core';
import { DepartementService } from '../departement/departement.service';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { EmployeeService } from '../employee/employee.service';
import { DeptEmployeeState } from 'src/app/models/dept-employee-state.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private departementService: DepartementService, private employeeService: EmployeeService) { }

  combineDepartmentsWithEmployeeCounts(): Observable<DeptEmployeeState[]> {
    return this.departementService.getdepartements().pipe(
      switchMap(departments =>
        forkJoin(
          departments.map(dep =>
            this.employeeService.getEmployeeNumberInDepartment(dep.name).pipe(
              map(employeeCount => ({ name: dep.name, value: employeeCount } as DeptEmployeeState))
            )
          )
        )
      )
    );
  }

}
