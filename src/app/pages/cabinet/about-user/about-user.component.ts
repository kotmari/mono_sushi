import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account/account.service';
import {IRegister, IRegisterWithExtra} from "../../../shared/interface/login/registr.interface";



@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss']
})
export class AboutUserComponent implements OnInit {

  public usersCabinet!:IRegister;
  public aboutForm!: FormGroup;
  public user!: any;


  
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initAboutForm();
    // this.loadOrder();
   
  }

  initAboutForm(){
    this.aboutForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
    });

 }


  // loadOrder() {
  //    const userExists = localStorage.getItem('currentUser');
  //    if (userExists) {
  //    this.user = JSON.parse(userExists);
  //    this.aboutForm.patchValue({
  //         firstName: this.user.firstName,
  //         lastName: this.user.lastName,
  //         phone: this.user.phoneNumber,
  //         address: this.user.address,
  //       });
  //     }

    
  // }


  // updateUserAbout():void{
  //   const userExists = localStorage.getItem('currentUser');
  //   if (userExists) {
  //     const aboutUser: Partial<IRegisterWithExtra> = {
  //       firstName: this.aboutForm.value.firstName,
  //       lastName: this.aboutForm.value.lastName,
  //       phoneNumber: this.aboutForm.value.phone,
  //       address: this.aboutForm.value.address

  //     };
  //    const user = JSON.parse(userExists);
  //    const userId = user.uid;
  //    this.accountService.updateAboutUserFirebase(userId, aboutUser)
  //    .then(() => {
  //     this.toastr.success('Users successfully update about');
  //    })
  //    .catch((error) => {
  //     console.error('Failed to update about user:', error);
  //   });
  //   }
  // }
 
  


}