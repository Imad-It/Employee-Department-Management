import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { Observable, map, switchMap } from 'rxjs';
import { Departement } from 'src/app/models/departement.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly url: string = `http://localhost:3000/employees`;

  employeeListUpdated: EventEmitter<void> = new EventEmitter();
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, employee)
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getEmployeesByDepartement(departementName: string) {
    return this.http.get<Employee[]>(`${this.url}?departement=${departementName}`)
  }

  public getEmployeeNumberInDepartement(departement: Departement): Observable<number> {
    return this.getEmployeesByDepartement(departement.name)
      .pipe(map((employees: Employee[]) => employees.length));
  }

  deactivatePreviousManager(employee: Employee): Observable<Employee> {
    return this.getEmployeesByDepartement(employee.departement).pipe(
      map((emps: Employee[] | null) => {
        const employeeToChange: Employee | undefined = emps?.find(emp => emp.isManager === true);
        if (employeeToChange) {
          employeeToChange.isManager = false;
          return employeeToChange;
        } else {
          employee.isManager = !employee.isManager;
          return employee;
        }
      }),
      switchMap((emp: Employee) => {
        return this.updateEmployee(emp.id, emp);
      })
    );
  }

  activateCurrentManager(employee: Employee): Observable<Employee> {
    const updatedManager = { isManager: !employee.isManager };
    const api = `${this.url}/${employee.id}`;
    return this.http.patch<Employee>(api, updatedManager);
  }
}
