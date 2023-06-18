import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin } from '../../interface/login/login.interface';
import {
  collectionData,
  CollectionReference,
  doc,
  docData,
  Firestore, updateDoc
} from "@angular/fire/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  DocumentData,
} from '@firebase/firestore';
import { IRegisterWithExtra } from '../../interface/login/registr.interface';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public isUserLogin$ = new Subject<boolean>();
  private userCollection!: CollectionReference<DocumentData>;
  private url = environment.BACKEND_URL;
  private api = {auth: `${this.url}/auth`};

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) { 
    this.userCollection = collection(this.afs, 'users')
  }


  getUsersFirebase(){
     return collectionData(this.userCollection, {idField: 'id'})
  }

  

  getOneUserFirebase(id: string){
    const userDocumentReference = doc(this.afs, `users/${id}`);
    return (docData(userDocumentReference, {idField: 'id'}));
  }

  login(credential: ILogin): Observable<any>{
    return this.http.get(`${this.api.auth}?email=${credential.email}&password=${credential.password}`)
   }


  updateUserFirebase(user: ILogin, id: string) {
      return updateDoc(doc(this.afs, `users/${id}`), { ...user });
  }
    

   updateUserOrders(userId: string, orders: any[]) {
    const userRef = doc(this.afs, `users/${userId}`);
    const updatedData = { orders };
    return updateDoc(userRef, updatedData);
  }

  // updateAboutUserFirebase(id: string, data: Partial<IRegisterWithExtra>) {
  //   return updateDoc(doc(this.afs, `users/${id}`), data);
  // } 
 



}





