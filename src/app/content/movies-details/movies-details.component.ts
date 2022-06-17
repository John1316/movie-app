import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { movies } from 'src/app/models/movies';
import { CategoriesService } from 'src/app/services/categories.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.scss']
})
export class MoviesDetailsComponent implements OnInit {

  success: string = '';
  error: string = '';
  movie!:movies;
  loading:boolean = false;
  loadingAction: boolean = false;
  categoryContainer: Category[]= [];
  indexForNumbers!: number;
  movieImage ='https://test-api.storexweb.com/';
  _method = 'put';
  constructor(
    private _MoviesService:MoviesService,
    private _CategoriesService:CategoriesService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router,
    private _Title:Title
  ) { }

  ngOnInit(): void {
    this.getDetails();
    this.showCategories();
  }
  showCategories(){
    this._CategoriesService.getAllCategories().subscribe(
      (response) => {
        this.categoryContainer = response.message
      }
    )
  }
  getDetails(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];
    this.loading = true;
    this._MoviesService.getMovieDetails(this.indexForNumbers).subscribe(
      (response) => {
        this.movie = response.message
        this._Title.setTitle(`Task | ${response.message.name}`)
        this.loading = false;

      }
    )
  }





  updateMovie = new FormGroup({
    'name' : new FormControl('', Validators.required),
    'description' : new FormControl('', Validators.required),
    'category_id' : new FormControl('', Validators.required),
    'image' : new FormControl(null),
    '_method' : new FormControl('', Validators.required),
  })

  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.updateMovie.patchValue({
      image: file
    })
    this.updateMovie.get('image')?.updateValueAndValidity()
  }



  onUpdate(){
    this._MoviesService.updateMovie(
      this.indexForNumbers,
      this.updateMovie.value.name,
      this.updateMovie.value.description,
      this.updateMovie.value.image,
      this.updateMovie.value.category_id,
      this.updateMovie.value._method

      ).subscribe(
        (response) =>{
          this.loadingAction = true;
        if(response.status === 'success'){
          this.success = 'Your movie updated successfully'
          this.error = ''
          this.loadingAction = false;

          setTimeout(() => {
            this._Router.navigate(['/movies']);
          }, 3000);
        }
      }
      , error => {
        console.log(error);
      }
    )
  }

}
