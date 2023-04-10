import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckautComponent } from './checkaut.component';

describe('CheckautComponent', () => {
  let component: CheckautComponent;
  let fixture: ComponentFixture<CheckautComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckautComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
