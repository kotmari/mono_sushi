import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {collectionData, CollectionReference, doc, docData, Firestore, updateDoc} from '@angular/fire/firestore';
import {addDoc, collection, deleteDoc, DocumentData} from '@firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { IOrderRequest } from '../../interface/order/order.interface';
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public changeBasket = new Subject<boolean>();
  private orderCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.orderCollection = collection(this.afs, 'orders')
  }


  getAllFirebase() {
    return collectionData(this.orderCollection, {idField: 'id'})
  }

  getOneUserFirebase(id: string){
    const userDocumentReference = doc(this.afs, `orders/${id}`);
    return (docData(userDocumentReference, {idField: 'id'}));
  }

  createFirebase(order: IOrderRequest) {
    return addDoc(this.orderCollection, order);
  }


  updateFirebase(order: IOrderRequest, id: string){
    const orderDocumentReference = doc(this.afs, `orders/${id}`);
    return updateDoc(orderDocumentReference, {...order});
  }

  deleteFirebase(id: string){
    const orderDocumentReference = doc(this.afs, `orders/${id}`);
    return deleteDoc(orderDocumentReference);
  }









}
