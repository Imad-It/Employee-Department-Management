import { Departement } from "./departement.model";
import { Employee } from "./employee.model";

export interface DepartementManagerInfo extends Departement {
  manager: Employee
}
