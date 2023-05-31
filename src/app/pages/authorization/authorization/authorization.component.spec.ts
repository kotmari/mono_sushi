import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationComponent } from './authorization.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        ReactiveFormsModule
      ],
      providers:[
        { provide: MatDialogRef, useValue: {}},
        { provide: Auth, useValue: {}},
        { provide: Firestore, useValue: {}},
        { provide: ToastrService, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize loginForm', () => {
    expect(component.authForm.value).toEqual({email: null, password: null});
  })

  it('should require email and password before authform', () => {
    component.authForm.controls['email'].setValue('test@example.com');
    component.authForm.controls['password'].setValue('password123');
    fixture.detectChanges();

    const emailFormControl = component.authForm.controls['email'];
    const passwordFormControl = component.authForm.controls['password'];

    expect(emailFormControl.valid).toBe(true);
    expect(passwordFormControl.valid).toBe(true);
    expect(emailFormControl.value).toBe('test@example.com');
    expect(passwordFormControl.value).toBe('password123');
  });

});
