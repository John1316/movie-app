import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(
    private _HttpClient:HttpClient
  ) { }

    // get all categories function

  getAllCategories(): Observable<any>{
    return this._HttpClient.get<Category[]>(`${environment.apiUrl}category`)
  }

  // serach in all categories function

  getSearchBycategory(id:number): Observable<any>{
    return this._HttpClient.get<Category[]>(`${environment.apiUrl}moviesByCategory/${id}`)
  }
}
