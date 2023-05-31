import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductComponent } from './admin-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from "@angular/forms";

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
          { provide: Storage, useValue: {}},
          { provide: ToastrService, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add the "show" class when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.collapse');
    expect(element.classList).toContain('show');
  });

  it('should not add the "show" class when isOpen is false', () => {
    // Set up
    const fixture = TestBed.createComponent(AdminProductComponent);
    const component = fixture.componentInstance;
    component.isOpen = false; 
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.collapse');

    expect(element).toBeNull();
  });

  it('should toggle the isOpen property', () => {

    const fixture = TestBed.createComponent(AdminProductComponent);
    const component = fixture.componentInstance;

    expect(component.isOpen).toBe(false);

    component.toggleOpenForm();

    expect(component.isOpen).toBe(true);

    component.toggleOpenForm();

    expect(component.isOpen).toBe(false);
  });
});
