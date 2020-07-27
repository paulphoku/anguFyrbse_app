import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApisService {
  _Url = 'https://ems-b.herokuapp.com/';

  //register user
  register(password, id , name, email){
    return this.http.post<any>(
      this._Url + 'register', 
      {
        password, id, name, email
      }
    )
  }

  

  constructor(private http : HttpClient) { }
}
