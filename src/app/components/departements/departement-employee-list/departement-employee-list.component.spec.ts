import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartementEmployeeListComponent } from './departement-employee-list.component';

describe('DepartementEmployeeListComponent', () => {
  let component: DepartementEmployeeListComponent;
  let fixture: ComponentFixture<DepartementEmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartementEmployeeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartementEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
