import { Injectable } from '@angular/core';
import { DepartementService } from '../departement/departement.service';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { EmployeeService } from '../employee/employee.service';
import { DepartementSummary } from 'src/app/models/departementSummary.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private departementService: DepartementService, private employeeService: EmployeeService) { }

  combineDepartmentsWithEmployeeCounts(): Observable<DepartementSummary[]> {
    return this.departementService.getDepartements().pipe(
      switchMap(departements =>
        forkJoin(
          departements.map(departement =>
            this.employeeService.getEmployeeNumberInDepartement(departement).pipe(
              map(employeeCount => ({ name: departement.name, value: employeeCount } as DepartementSummary))
            )
          )
        )
      )
    );
  }

}
