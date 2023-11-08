import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departement } from 'src/app/models/departement.model';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  url: string = "http://localhost:3000/departements";

  departementListUpdated: EventEmitter<void> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getdepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.url);
  }

  addDepartement(departement: Departement) {
    return this.http.post<Departement>(this.url, departement);
  }

  updateDepartement(id: number, departement: Departement) {
    return this.http.put(`${this.url}/${id}`, departement);
  }

  deleteDepartement(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
