import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Auth} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";
import {ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit{

  public changePasswordForm!: FormGroup;
  public checkPassword = false;

  public hide = true;
  public hide1 = true;
  public hide2 = true;
 constructor(
   private fb:FormBuilder,
   private router: Router,
   private auth: Auth,
   private afs: Firestore,
   private toastr: ToastrService
 ) {
 }

 ngOnInit() {
   this.initChangePasswordForm();
 }

  initChangePasswordForm(): void{
    this.changePasswordForm = this.fb.group({
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmedPassword:[null, [Validators.required]]
    })
  }



// Метод для зміни паролю
  async changePassword(currentPassword: string, newPassword: string): Promise<any> {
    try {
      // Отримання поточного користувача
      const user = this.auth.currentUser;
      console.log(user)
      //
      // if (user) {
      //   // Перевірка поточного пароля
      //   const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
      //   await user.reauthenticateWithCredential(credential);
      //
      //   // Зміна пароля на новий
      //   await user.updatePassword(newPassword);
      //
      //   // Оновлення збереженого пароля користувача в базі даних або сервісі аутентифікації
      //   // ...
      //
      //   console.log('Пароль успішно змінено');
      // }
    } catch (error) {
      console.error('Помилка зміни пароля:', error);
    }
  }

  checkConfirmedPassword():void{
    this.checkPassword = this.password.value === this.confirmed.value;
    if(this.password.value !== this.confirmed.value){
      this.changePasswordForm.controls['confirmedPassword'].setErrors({
        matchError: 'Password confirmation doesnt match'
      })
    }
  }

  get password(): AbstractControl{
    return this.changePasswordForm.controls['newPassword'];
  }
  get confirmed(): AbstractControl{
    return this.changePasswordForm.controls['confirmedPassword'];
  }
  checkVisibilityError(control: string, name: string): boolean | null{
    return this.changePasswordForm.controls[control].errors?.[name]
  }

  resetForm():void{
   this.changePasswordForm.reset();
  }

}






