import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICategoryResponse } from 'src/app/shared/interface/category/categori.interface';
import { IProductResponse } from 'src/app/shared/interface/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> =  [];
  public adminProducts: Array<IProductResponse> = [];

  public isOpen = false;
  public editStatus = false;
  public uploadPercent = 0;
  public isUploaded = false;
  private currentProductId =0;

  public productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private toastr: ToastrService
  ){}


  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProduct();
    
  }

  initProductForm(): void{
    this.productForm = this.fb.group({
      category:[null, Validators.required],
      name:[null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count:[1]
    });
  }

  loadCategories(): void{
    this.categoryService.getAll().subscribe(date =>{
      this.adminCategories = date;
    })
  }

  loadProduct(): void{
    this.productService.getAll().subscribe(date => {
      this.adminProducts = date;
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    })
  }

  addProduct():void{
    if (this.editStatus){
      this.productService.update(this.productForm.value, this.currentProductId).subscribe(() => {
        this.loadProduct();
        this.isOpen=false;
        this.editStatus = false;
        this.toastr.success('Product successfully updated');
       })
    } else{
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProduct();
        this.isOpen=false;
        this.editStatus = false;
        this.toastr.success('Product successfully created');
       })
    }
  }

  editProduct(product: IProductResponse): void{
    this.productForm.patchValue({
      category: product.category,
      name:product.name,
      path: product.path,
      description: product.description,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
    });
    this.isOpen = true;
    this.isUploaded = true;
    this.editStatus = true;
    this.currentProductId = product.id;
  }

  deleteProduct(product: IProductResponse):void{
    this.productService.delete(product.id).subscribe(()=>{
      this.loadProduct();
      this.toastr.success('Product successfully deleted');
    })
  }

  uploadProduct(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('image', file.name, file)
    .then(data => {
      this.productForm.patchValue({
        imagePath: data
      });
      this.isUploaded = true;
    })
    .catch(err => {console.log(err)})
  }

  deleteImage():void{
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
    .then(() => {
      this.isUploaded = false;
      this.uploadPercent=0;
      this.productForm.patchValue({imagePath: null});
    })
    .catch(err => {console.log(err)});
  }

  valueByControl(control: string): string{
    return this.productForm.get(control)?.value;
  }

  toggleOpenForm():void{
    this.isOpen = !this.isOpen;
  }

}
