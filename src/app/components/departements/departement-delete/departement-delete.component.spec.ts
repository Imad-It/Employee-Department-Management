import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartementDeleteComponent } from './departement-delete.component';

describe('DepartementDeleteComponent', () => {
  let component: DepartementDeleteComponent;
  let fixture: ComponentFixture<DepartementDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartementDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartementDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
