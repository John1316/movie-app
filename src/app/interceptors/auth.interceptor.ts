import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _AuthService:AuthService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // define the token
    const currentUserToken = JSON.parse(localStorage.getItem('currentUserToken') || '{}');
    // if the current data is not nul then clone the authorization + Bearer token
    if (this._AuthService.currentUserData.getValue() != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserToken}`
        }
      });
    }
    //  if the token expired and data is error with 401 then go to signout function to handle 401 error 
    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
         return;
        }
        this._AuthService.signOut()
      }
    }));
    // return next.handle(request);
  }
}
