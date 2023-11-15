import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeAddEditComponent } from './components/employees/employee-add-edit/employee-add-edit.component';
import { EmployeeDeleteComponent } from './components/employees/employee-delete/employee-delete.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './components/employees/employee-detail/employee-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { DepartementListComponent } from './components/departements/departement-list/departement-list.component';
import { DepartementAddEditComponent } from './components/departements/departement-add-edit/departement-add-edit.component';
import { DepartementDetailComponent } from './components/departements/departement-detail/departement-detail.component';
import { DepartementDeleteComponent } from './components/departements/departement-delete/departement-delete.component';
import { DepartementEmployeeListComponent } from './components/departements/departement-employee-list/departement-employee-list.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { CardComponent } from './components/dashboard/card/card.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BarChartComponent } from './components/dashboard/bar-chart/bar-chart.component';
import { CardsContainerComponent } from './components/dashboard/cards-container/cards-container.component';
import { PieChartComponent } from './components/dashboard/pie-chart/pie-chart.component';




@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeAddEditComponent,
    EmployeeDeleteComponent,
    EmployeeDetailComponent,
    SidenavComponent,
    DepartementListComponent,
    DepartementAddEditComponent,
    DepartementDetailComponent,
    DepartementDeleteComponent,
    DepartementEmployeeListComponent,
    ProjectListComponent,
    DashboardComponent,
    CardComponent,
    SpinnerComponent,
    NotFoundComponent,
    BarChartComponent,
    CardsContainerComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
