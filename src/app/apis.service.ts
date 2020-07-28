import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  constructor(private http : HttpClient, private firestore: AngularFirestore) { }

  //register user
  createUser(data){
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("users")
        .add({
          usr_fname: data.usr_fname,
          usr_lname: data.usr_lname,
          usr_tel: data.usr_tel})
        .then(res => {}, err => reject(err));
    });
  }
}
