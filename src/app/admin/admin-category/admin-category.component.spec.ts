import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryComponent } from './admin-category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { CategoryService } from '../../shared/services/category/category.service';
import { of } from 'rxjs';
import { ICategoryResponse } from '../../shared/interface/category/categori.interface';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;
  let categoryService: CategoryService;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoryComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers:[
        { provide: Storage, useValue: {}},
        FormBuilder,
        CategoryService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    categoryService = TestBed.inject(CategoryService);
    fixture.detectChanges();
    component.initCategoryForm();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize categoryForm', () => {
    expect(component.categoryForm.value).toEqual({name: null, path: null, imagePath: null});
  });

  it('should require name, path, imagePath before categoryForm', () => {
    component.categoryForm.controls['name'].setValue('roll');
    component.categoryForm.controls['path'].setValue('rolls');
    component.categoryForm.controls['imagePath'].setValue('rolls.png');
    fixture.detectChanges();

    const nameFormControl = component.categoryForm.controls['name'];
    const pathFormControl = component.categoryForm.controls['path'];
    const imagePathControl = component.categoryForm.controls['imagePath'];

    expect(nameFormControl.valid).toBe(true);
    expect(pathFormControl.valid).toBe(true);
    expect(imagePathControl.valid).toBe(true);
    expect(nameFormControl.value).toBe('roll');
    expect(pathFormControl.value).toBe('rolls');
    expect(imagePathControl.value).toBe('rolls.png');
  });

  it('should return the value of imagePath control', () => {
    const imagePathValue = 'path/to/image.jpg';
    component.categoryForm.controls['imagePath'].setValue(imagePathValue);
    fixture.detectChanges();

    const result = component.valueByControl('imagePath');

    expect(result).toEqual(imagePathValue);
  });

  it('should update the categoryForm with values from the provided category', () => {
    const category = {
      id: '1',
      name: 'roll',
      path: 'rolls1',
      imagePath: 'image.jpg'
    };

    component.editCategory(category);

    const formValue = component.categoryForm.value;

    expect(formValue.name).toEqual(category.name);
    expect(formValue.path).toEqual(category.path);
    expect(formValue.imagePath).toEqual(category.imagePath);
  });

  // it('should set editStatus to true', () => {
  //   const category = {
  //     id: '1',
  //     name: 'roll',
  //     path: 'rolls1',
  //     imagePath: 'image.jpg'
  //   };
  //   component.editCategory(category);
  //   expect(component.editStatus).toBe(true);
  // });
  //
  // it('should set currentCategoryId to the provided category id', () => {
  //   const category = {
  //     id:'1',
  //     name: 'roll',
  //     path: 'rolls1',
  //     imagePath: 'image.jpg'
  //   };
  //   component.editCategory(category);
  //   expect(component.currentCategoryId).toEqual(category.id);
  // });
  //
  // it('should call categoryService.update if editStatus is true', () => {
  //   const dummyCategory: ICategoryResponse = {
  //     id: '1',
  //     name: 'roll',
  //     path: 'rolls1',
  //     imagePath: 'image.jpg'
  //   };
  //   spyOn(categoryService, 'updateFirebase').and.returnValue(of(dummyCategory));
  //
  //   component.editStatus = true;
  //
  //   component.addCategory();
  //
  //   expect(categoryService.updateFirebase).toHaveBeenCalledWith(component.categoryForm.value, component.currentCategoryId);
  // });
  // it('should call categoryService.create if editStatus is false', () => {
  //   const dummyCategory: ICategoryResponse = {
  //     id: '1',
  //     name: 'roll',
  //     path: 'rolls1',
  //     imagePath: 'image.jpg'
  //   };
  //
  //   spyOn(categoryService, 'createFirebase').and.returnValue(of(dummyCategory));
  //
  //   component.editStatus = false;
  //
  //   component.addCategory();
  //
  //   expect(categoryService.createFirebase).toHaveBeenCalledWith(component.categoryForm.value);
  // });
  //
  // it('should call loadCategories after category update or create', () => {
  //   const dummyCategory: ICategoryResponse = {
  //     id: '1',
  //     name: 'roll',
  //     path: 'rolls1',
  //     imagePath: 'image.jpg'
  //   };
  //
  //   spyOn(categoryService, 'updateFirebase').and.returnValue(of(dummyCategory));
  //   spyOn(categoryService, 'createFirebase').and.returnValue(of(dummyCategory));
  //   spyOn(component, 'loadCategories');
  //
  //   component.editStatus = true;
  //   component.addCategory();
  //
  //   expect(component.loadCategories).toHaveBeenCalled();
  //
  //   component.editStatus = false;
  //   component.addCategory();
  //
  //   expect(component.loadCategories).toHaveBeenCalledTimes(2);
  // });

});
