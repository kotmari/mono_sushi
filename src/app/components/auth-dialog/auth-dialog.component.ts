import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/constant';
import { IRegister } from '../../shared/interface/login/registr.interface';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public registerDate!: IRegister;
  public checkPassword = false;
  public isLogin = false;

  constructor (
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
  }

  initLoginForm(): void{
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  initRegisterForm(): void{
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmedPassword:[null, [Validators.required]]
    })
  }


  loginUser(): void{
    const { email, password } =  this.loginForm.value;
    this.login(email, password).then(() => {
      this.toastr.info('User successfully login');
      this.dialogRef.close();
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  async login(email: string, password: string): Promise<any>{
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER){
        this.router.navigate(['/cabinet']);
        }else if (user && user['role'] === ROLE.ADMIN){
        this.router.navigate(['/admin']);
        }
        this.accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    })
  }

  registerUser(): void {
    const{ email, password } = this.registerForm.value;
    this.registerDate = this.registerForm.value;
    this.emailSignUp(email, password).then(() =>{
      this.toastr.success('User successfully created');
      this.isLogin = !this.isLogin;
      this.registerForm.reset();
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

 async emailSignUp(email: string, password: string): Promise<any> {
  const credential = await createUserWithEmailAndPassword(this.auth, email, password);
  const user = {
    email: credential.user.email,
    firstName: this.registerDate.firstName,
    lastName: this.registerDate.lastName,
    phoneNumber: this.registerDate.phone,
    address: '',
    orders: [],
    role: 'USER'
  };
  setDoc(doc(this.afs, 'users', credential.user.uid), user);
 }

 changeForm(): void{
  this.isLogin = !this.isLogin;
 }

 checkConfirmedPassword():void{
    this.checkPassword = this.password.value === this.confirmed.value;
    if(this.password.value !== this.confirmed.value){
      this.registerForm.controls['confirmedPassword'].setErrors({
        matchError: 'Password confirmation doesnt match'
      })
      console.log(this.checkPassword)
    }
    console.log(this.checkPassword)
 }

 get password(): AbstractControl{
    return this.registerForm.controls['password'];
 }
  get confirmed(): AbstractControl{
    return this.registerForm.controls['confirmedPassword'];
  }

  checkVisibilityError(control: string, name: string): boolean | null{
    return this.registerForm.controls[control].errors?.[name]
  }

}


