import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountComponent } from './admin-discount.component';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DiscountService } from '../../shared/services/discount/discount.service';
import { of } from 'rxjs';
import { IDiscountResponse } from '../../shared/interface/discount/discount.interface';


describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;
  let fb: FormBuilder;
  let discountService: DiscountService;
  let toastrService: ToastrService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDiscountComponent ],
      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        DiscountService,
        { provide: Storage, useValue: {}},
        { provide: ToastrService, useValue: { success: () => {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDiscountComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    discountService = TestBed.inject(DiscountService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
    component. initDiscountForm();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize discountForm', () => {
    expect(component.discountForm.value).toEqual({name: null, title: null, description: null, imagePath: null});
  });

  it('should require name, title, description, imagePath before discountForm', () => {
    component.discountForm.controls['name'].setValue('3+1');
    component.discountForm.controls['title'].setValue('3+1');
    component.discountForm.controls['description'].setValue('qqq eee');
    component.discountForm.controls['imagePath'].setValue('3+1.png');
    fixture.detectChanges();

    const nameFormControl = component.discountForm.controls['name'];
    const titleFormControl = component.discountForm.controls['title'];
    const descriptionFormControl = component.discountForm.controls['description'];
    const imagePathControl = component.discountForm.controls['imagePath'];

    expect(nameFormControl.valid).toBe(true);
    expect(titleFormControl.valid).toBe(true);
    expect(descriptionFormControl.valid).toBe(true);
    expect(imagePathControl.valid).toBe(true);
    expect(nameFormControl.value).toBe('3+1');
    expect(titleFormControl.value).toBe('3+1');
    expect(descriptionFormControl.value).toBe('qqq eee');
    expect(imagePathControl.value).toBe('3+1.png');
  });


  it('should update the discountForm with values from the provided discount', () => {
    const discount = {
      id: 1,
      name: '3+1',
      title: '3+1',
      description: 'qq eee',
      imagePath: 'image.jpg'
    };

    component.editDiscount(discount);

    const formValue = component.discountForm.value;

    expect(formValue.name).toEqual(discount.name);
    expect(formValue.title).toEqual(discount.title);
    expect(formValue.description).toEqual(discount.description);
    expect(formValue.imagePath).toEqual(discount.imagePath);
  });

  it('should set editStatus to true', () => {
    const discount = {
      id: 1,
      name: '3+1',
      title: '3+1',
      description: 'qq eee',
      imagePath: 'image.jpg'
    };
    component.editDiscount(discount);
    expect(component.editStatus).toBe(true);
  });

  it('should set currentCategoryId to the provided category id', () => {
    const discount = {
      id: 1,
      name: '3+1',
      title: '3+1',
      description: 'qq eee',
      imagePath: 'image.jpg'
    };
    component.editDiscount(discount);
    expect(component.currentDiscountId).toEqual(discount.id);
  });

  it('should call discountService.update if editStatus is true', () => {
    const dummyDiscount: IDiscountResponse = {
      id: 1,
      name: '3+1',
      title: '3+1',
      description: 'qq eee',
      imagePath: 'image.jpg'
    };
    spyOn(discountService, 'update').and.returnValue(of(dummyDiscount));

    component.editStatus = true;

    component.addDiscount();

    expect(discountService.update).toHaveBeenCalledWith(component.discountForm.value, component.currentDiscountId);
  });

  it('should call discountService.create if editStatus is false', () => {
    const dummyDiscount: IDiscountResponse = {
      id: 1,
      name: '3+1',
      title: '3+1',
      description: 'qq eee',
      imagePath: 'image.jpg'
    };

    spyOn(discountService, 'create').and.returnValue(of(dummyDiscount));
    spyOn(toastrService, 'success');

    component.editStatus = false;

    component.addDiscount();

    expect(discountService.create).toHaveBeenCalledWith(component.discountForm.value);
    expect(toastrService.success).toHaveBeenCalledWith('Discount successfully created');
  });

  it('should call loadDiscount after category update or create', () => {
    const dummyDiscount: IDiscountResponse = {
      id: 1,
      name: '3+1',
      title: '3+1',
      description: 'qq eee',
      imagePath: 'image.jpg'
    };

    spyOn(discountService, 'update').and.returnValue(of(dummyDiscount));
    spyOn(discountService, 'create').and.returnValue(of(dummyDiscount));
      spyOn(toastrService, 'success');
    spyOn(component, 'loadDiscount');


    component.editStatus = true;
    component.addDiscount();

    expect(discountService.update).toHaveBeenCalledWith(component.discountForm.value, component.currentDiscountId);
    expect(toastrService.success).toHaveBeenCalledWith('Discount successfully updated');

    component.editStatus = false;
    component.addDiscount();

    expect(discountService.create).toHaveBeenCalledWith(component.discountForm.value);
    expect(toastrService.success).toHaveBeenCalledWith('Discount successfully created');
    expect(component.loadDiscount).toHaveBeenCalledTimes(2);
  });




});
