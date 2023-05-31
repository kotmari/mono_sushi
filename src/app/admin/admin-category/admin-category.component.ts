import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interface/category/categori.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];

  public addForms = false;
  public isUploaded =false;
  public editStatus= false;
  public currentCategoryId = 0;


  public categoryForm!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private storage: Storage
  ){}
  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories()
  }

  initCategoryForm(): void{
    this.categoryForm = this.fb.group({
      name:[null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  loadCategories(): void{
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
    })
  }

  addForm(): void{
    this.addForms = !this.addForms;

  }

  addCategory():void{
    if (this.editStatus){
      this.categoryService.update(this.categoryForm.value, this.currentCategoryId).subscribe(()=>{
        this.loadCategories();
      })
    } else{
      this.categoryService.create(this.categoryForm.value).subscribe(()=>{
        this.loadCategories();
      });
    }
    this.editStatus = false;
    this.addForms = false;
    this.categoryForm.reset();
    this.isUploaded=false;

  }

  editCategory(category: ICategoryResponse):void{
    this.categoryForm.patchValue({
      name: category.name,
      path:category.path,
      imagePath: category.imagePath
    });
    this.editStatus=true;
    this.addForms = true;
    this.currentCategoryId = category.id;
    this.isUploaded = true;
  }

  deleteCategory(category: ICategoryResponse): void{
    this.categoryService.delete(category.id).subscribe(()=>{
      this.loadCategories();
    })
  }

  upload(event: any): void{
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
    .then(data => {
      this.categoryForm.patchValue({
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
      this.categoryForm.patchValue({
        imagePath: null
      })

    })
  }

  valueByControl(control: string): string{
    return this.categoryForm.get(control)?.value;
  }

}


