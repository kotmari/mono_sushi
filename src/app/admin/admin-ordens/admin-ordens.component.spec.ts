import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdensComponent } from './admin-ordens.component';

describe('AdminOrdensComponent', () => {
  let component: AdminOrdensComponent;
  let fixture: ComponentFixture<AdminOrdensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrdensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrdensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
