import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartementAddEditComponent } from './departement-add-edit.component';

describe('DepartementAddEditComponent', () => {
  let component: DepartementAddEditComponent;
  let fixture: ComponentFixture<DepartementAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartementAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartementAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
