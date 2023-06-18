import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoryRequest } from '../../interface/category/categori.interface';
import {
  collectionData,
  CollectionReference,
  doc,
  Firestore, updateDoc
} from "@angular/fire/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  DocumentData,
} from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.categoryCollection = collection(this.afs, 'categories');
  }

  getAllFirebase(){
    return collectionData(this.categoryCollection, {idField: 'id'});
  }

  createFirebase(category: ICategoryRequest){
    return addDoc(this.categoryCollection, category);
  }

  updateFirebase(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, {...category});
  }

  deleteFirebase(id: string){
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference);
  }


}
