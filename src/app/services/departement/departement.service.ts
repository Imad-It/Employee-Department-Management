import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Departement } from 'src/app/models/departement.model';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { DepartementManagerInfo } from 'src/app/models/departementManagerInfo.model';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  readonly url: string = "http://localhost:3000/departements";

  departementListUpdated: EventEmitter<void> = new EventEmitter();

  constructor(private http: HttpClient, private employeeService: EmployeeService) { }

  getDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.url);
  }

  addDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(this.url, departement);
  }

  updateDepartement(id: number, departement: Departement): Observable<Departement> {
    return this.http.put<Departement>(`${this.url}/${id}`, departement);
  }

  deleteDepartement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getDepartementsWithManagers(): Observable<DepartementManagerInfo[]> {
    return this.getDepartements().pipe(
      switchMap((departements: Departement[]) =>
        forkJoin(
          departements.map((departement: Departement) =>
            this.employeeService.getEmployeesByDepartement(departement.name).pipe(
              map((employees: Employee[]) => {
                const manager = employees.find(employee => employee.isManager === true);
                return { ...departement, manager: manager || null } as DepartementManagerInfo;
              })
            )
          )
        )
      )
    );
  }


}
