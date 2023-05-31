import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDialogComponent } from './auth-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;
  let fb: FormBuilder;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthDialogComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers:[
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {}},
        { provide: Firestore, useValue: {}},
        { provide: ToastrService, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;


    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm', () => {
    expect(component.loginForm.value).toEqual({email: null, password: null});
  })

  it('should require email and password before login', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    fixture.detectChanges();

    const emailFormControl = component.loginForm.controls['email'];
    const passwordFormControl = component.loginForm.controls['password'];

    expect(emailFormControl.valid).toBe(true);
    expect(passwordFormControl.valid).toBe(true);
    expect(emailFormControl.value).toBe('test@example.com');
    expect(passwordFormControl.value).toBe('password123');
  });

  it('should initialize registerForm', () => {
    expect(component.registerForm.value).toEqual({
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      password: null,
      confirmedPassword: null,
    });
  });

  it('should require firstName field', () => {
    const firstNameControl = component.registerForm.controls['firstName'];
    firstNameControl.setValue(null);
    expect(firstNameControl.valid).toBeFalsy();
    expect(firstNameControl.errors?.['required']).toBeTruthy();
  });

  it('should require lastName field', () => {
    const lastNameControl = component.registerForm.controls['lastName'];
    lastNameControl.setValue(null);
    expect(lastNameControl.valid).toBeFalsy();
    expect(lastNameControl.errors?.['required']).toBeTruthy();
  });

  it('should require phoneNumber field', () => {
    const phoneNumberControl = component.registerForm.controls['phoneNumber'];
    phoneNumberControl.setValue(null);
    expect(phoneNumberControl.valid).toBeFalsy();
    expect(phoneNumberControl.errors?.['required']).toBeTruthy();
  });

  it('should require email field', () => {
    const emailControl = component.registerForm.controls['email'];
    emailControl.setValue(null);
    expect(emailControl.valid).toBeFalsy();
    expect(emailControl.errors?.['required']).toBeTruthy();
  });

  it('should require password field', () => {
    const passwordControl = component.registerForm.controls['password'];
    passwordControl.setValue(null);
    expect(passwordControl.valid).toBeFalsy();
    expect(passwordControl.errors?.['required']).toBeTruthy();
  });

  it('should require confirmedPassword field', () => {
    const confirmedPasswordControl = component.registerForm.controls['confirmedPassword'];
    confirmedPasswordControl.setValue(null);
    expect(confirmedPasswordControl.valid).toBeFalsy();
    expect(confirmedPasswordControl.errors?.['required']).toBeTruthy();
  });

  it('should validate matching passwords', () => {
    const passwordControl = component.registerForm.controls['password'];
    const confirmedPasswordControl = component.registerForm.controls['confirmedPassword'];

    passwordControl.setValue('password123');
    confirmedPasswordControl.setValue('password456');

    component.checkConfirmedPassword();

    expect(confirmedPasswordControl.errors?.['matchError']).toBeTruthy();
    expect(confirmedPasswordControl.errors?.['matchError']).toEqual('Password confirmation doesnt match');

    confirmedPasswordControl.setValue('password123');
    component.checkConfirmedPassword();
    expect(confirmedPasswordControl.errors?.['matchError']).toBeFalsy();
  });










});
