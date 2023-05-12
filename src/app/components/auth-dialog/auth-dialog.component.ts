import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  public authForm!: FormGroup;
  public registrForm!: FormGroup;
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
    this.initAuthForm();
    this.initRegistrForm();
  }

  initAuthForm(): void{
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  initRegistrForm(): void{
    this.registrForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]]
    })
  }
  

  loginUser(): void{
    const { email, password } =  this.authForm.value;
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
    const{ email, password, firstName, lastName, phoneNumber } = this.registrForm.value;
    this.emailSignUp(email, password, firstName, lastName, phoneNumber).then(() =>{
      this.toastr.success('User successfully created');
      this.isLogin = !this.isLogin;
      this.authForm.reset();
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

 async emailSignUp(
  email: string, password: string, firstName:string, lastName:string, phoneNumber:string
  ): Promise<any> {
  const credential = await createUserWithEmailAndPassword(this.auth, email, password);
  const user = {
    email: credential.user.email,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    address: '',
    orders: [],
    role: 'USER'
  };
  setDoc(doc(this.afs, 'users', credential.user.uid), user);
 }

 changeForm(): void{
  this.isLogin = !this.isLogin;
 }

}


