import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url: string = `http://localhost:3000/employees`;

  employeeListUpdated: EventEmitter<void> = new EventEmitter();
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, employee)
  }

  updateEmployee(id: number, employee: Employee) {
    return this.http.put(`${this.url}/${id}`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getEmployeesByDepartement(departement: string) {
    return this.http.get<Employee[]>(`${this.url}?departement=${departement}`)
  }
}
