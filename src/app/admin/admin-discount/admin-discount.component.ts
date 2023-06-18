import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interface/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit{


  public adminDiscounts: Array<IDiscountResponse> = [];


  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  public currentDiscountId!: string;
  public addForms = false;
  public date = new Date();

  public discountForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private discountService: DiscountService,
    private storage: Storage
   ){}


  ngOnInit(): void {
    this.initDiscountForm();
    this.loadDiscount();

  }

  initDiscountForm(): void{
    this.discountForm = this.fb.group({
      name:[null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  loadDiscount():void{
    this.discountService.getAllFirebase().subscribe(data=>{
      this.adminDiscounts = data as IDiscountResponse[];
    })
  }

  addForm(): void{
    this.addForms = !this.addForms;

  }

  addDiscount():void{
    if (this.editStatus){
      this.discountService.updateFirebase(this.discountForm.value, this.currentDiscountId).then(()=>{
        this.loadDiscount();
        this.toastr.success('Discount successfully updated');
      })
    } else{
      this.discountService.createFirebase(this.discountForm.value).then(()=>{
        this.loadDiscount();
        this.toastr.success('Discount successfully created');
      });
    }
    this.editStatus = false;
    this.addForms = false;
    this.discountForm.reset();
    this.isUploaded=false;

  }

  editDiscount(discount: IDiscountResponse):void{
    this.discountForm.patchValue({
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath
    })
    this.editStatus=true;
    this.addForms = true;
    this.currentDiscountId = discount.id;
    this.isUploaded = true;
  }

  deleteDiscount(discount:IDiscountResponse): void{
    this.discountService.deleteFirebase(discount.id).then(()=>{
      this.loadDiscount();
      this.toastr.success('Discount successfully deleted!');
    })
  }

  upload(event: any): void{
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
    .then(data => {
      this.discountForm.patchValue({
        imagePath: data
      });
      this.isUploaded = true;
    })
    .catch(err => {
      console.log(err);
    });
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string>{
    const path = `${folder}/${name}`;
    let url = '';
    if (file){
      try{
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data =>{
          this.uploadPercent = data.progress;
        });
        await task;
        url = await getDownloadURL(storageRef);
      }catch(e:any){
        console.error(e);
      }
    }else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }



  deleteImage(): void{
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(()=>{
      console.log('File delete');
      this.isUploaded = false;
      this.discountForm.patchValue({
        imagePath: null
      })

    })
  }
  valueByControl(control: string): string{
    return this.discountForm.get(control)?.value;
  }



}


