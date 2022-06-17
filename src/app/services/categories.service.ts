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

  // get category details
  getCategorydetails(id:number): Observable<any>{
    return this._HttpClient.get<Category[]>(`${environment.apiUrl}category/${id}`)
  }

  // serach in all categories function

  getSearchBycategory(id:number): Observable<any>{
    return this._HttpClient.get<Category[]>(`${environment.apiUrl}moviesByCategory/${id}`)
  }
    // create movies function
    createCategory(
      formData: string
    ):Observable<any>{

      return this._HttpClient.post<Category[]>(`${environment.apiUrl}category` , formData)
    }

      // update category function

    updateCategory(
      id:number,
      formData: string


    ):Observable<any>{


      return this._HttpClient.post<Category[]>(`${environment.apiUrl}category/${id}` , formData     )
    }

    // delete movies function
    deleteCategory(id:number , formData:string):Observable<any>{
      return this._HttpClient.post<Category[]>(`${environment.apiUrl}category/${id}` , formData
      )
    }
}
