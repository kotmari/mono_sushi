import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/constant';
import { AccountService } from 'src/app/shared/services/account/account.service';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {


  public authForm!: FormGroup;

  constructor (
    private fb: FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void{
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  loginUser(): void{
    const { email, password } =  this.authForm.value;
    this.login(email, password).then(() => {
      this.toastr.info('User successfully login');
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
}
