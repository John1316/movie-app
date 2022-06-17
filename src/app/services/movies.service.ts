import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { movies } from '../models/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private _HttpClient:HttpClient,

  ) { }

  // get all movies function
  getMovies() : Observable<any>{

    return this._HttpClient.get<movies[]>( `${environment.apiUrl}movies`    )
  }
    // get movie detail function

  getMovieDetails(id:number): Observable<any>{
    return this._HttpClient.get<movies[]>(`${environment.apiUrl}movies/${id}`    )
  }

  // create movies function
  createMovie(
    name: string,
    description: string,
    category_id:string,
    image: File,

  ):Observable<any>{
    var formData = new FormData();
    formData.append('name',name);
    formData.append('description',description);
    formData.append('category_id',category_id);
    formData.append('image',image);
    return this._HttpClient.post<movies[]>(`${environment.apiUrl}movies` , formData)
  }

    // update movies function

  updateMovie(
    id:number,
    name: string,
    description: string,
    image: File,
    category_id:string,
    _method: string,


  ):Observable<any>{
    var formData = new FormData();
    formData.append('name',name);

    formData.append('description',description);
    formData.append('image',image);
    formData.append('category_id',category_id);
    formData.append('_method',_method);

    return this._HttpClient.post<movies[]>(`${environment.apiUrl}movies/${id}` , formData     )
  }

  // delete movies function
  deleteMovie(id:number , formData:string):Observable<any>{
    return this._HttpClient.post<movies[]>(`${environment.apiUrl}movies/${id}` , formData
    )
  }
}
