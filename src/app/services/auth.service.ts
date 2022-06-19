import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // define cureent user data witch we will store and save the token
  currentUserData: any = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient , private _Router:Router) {
    // if localstorage have currentusertoken then go to function saveCurrentUserToken() and save it and make it
    if (localStorage.getItem('currentUserToken' || '{}')) {
      this.saveCurrentUserToken();
    }
  }

  //save current user token get the encoded token in local storage and saves it untill it expires
  saveCurrentUserToken() {

    let encodedToken: any = localStorage.getItem('currentUserToken');
    this.currentUserData.next(encodedToken)
  }

// login function
  login(formdata:string): Observable<any>{
    return this._HttpClient.post<User[]>(`${environment.apiUrl}login`,formdata )
  }
  // register function

  register(formdata:string): Observable<any>{
    return this._HttpClient.post<User[]>(`${environment.apiUrl}register`,formdata )
  }

    // signOut function

  signOut(){
    this.currentUserData.next(null);
    localStorage.removeItem('currentUserToken');
    this._Router.navigate(['/login']);


  }
}
