import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/models/category';
import { movies } from 'src/app/models/movies';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  // declarations
  pageName: string = 'Movies';
  success: string = '';
  error: string = '';
  delete: string = '';
  movies: movies[] =[];
  categoryContainer: Category[]= [];
  modalRef!: BsModalRef;
  config:any;
  page:any;
  currentPage = 1;
  searchWord!: string;
  movieImage ='https://test-api.storexweb.com/';
  fullscreed: boolean = false;
  loading: boolean = false;
  loadingAction: boolean = false;
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  constructor(
    private _MoviesService:MoviesService,
    private _Title:Title,
    private _CategoriesService:CategoriesService,
    public modalService: BsModalService  ) {
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
      };
     }

  ngOnInit(): void {
    this.showMovies();
    this.showCategories();
    this._Title.setTitle(`Task | movies`)

  }
  // create movie validation
  createMovie = new FormGroup({
    'name' : new FormControl('', Validators.required),
    'description' : new FormControl('', Validators.required),
    'category_id' : new FormControl('', Validators.required),
    'image' : new FormControl(null, Validators.required),
  })

  // image onchange
  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createMovie.patchValue({
      image: file
    })
    this.createMovie.get('image')?.updateValueAndValidity()
  }
  // create movie
  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }
  pageChanged(event:any){
    this.config.currentPage = event;
  }
  // fetch movies
  showMovies(){
    this.loading = true
    this._MoviesService.getMovies().subscribe(
      (response) => {
        this.movies = response.message
        this.loading = false
      }
    )
  }


  onChange(deviceValue:any) {
    this.loading = true
    this._CategoriesService.getSearchBycategory(deviceValue.target.value).subscribe(
      (response) => {
        this.movies = response.message
        this.loading = false
      })
  }

  // create movie
  onCreate(){
      this.loadingAction = true

    this._MoviesService.createMovie(
      this.createMovie.value.name,
      this.createMovie.value.description,
      this.createMovie.value.category_id,
      this.createMovie.value.image,
    ).subscribe(
      (response) =>{
        if(response.status === 'success'){
          this.success = 'Your movie posted successfully'
          this.error = ''
          this.delete = ''
          this.showMovies()
          this.modalRef.hide()
          this.loadingAction = false

          this.createMovie.reset();
        }else{

          console.log(response);
        }
      }
    )
  }
  // delete movies
  onDelete(id:number , data:any){
    if(confirm(`Are you sure to delete movie with id ${id}`)) {

      this.loadingAction = true
      this._MoviesService.deleteMovie(id,data ).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.delete = 'Your movie deleted successfully';
            this.error = '';
            this.success = '';
            this.loadingAction = false

            this.showMovies();
          }
        }
      )
    }
  }

    // fetch categories
    showCategories(){
      this._CategoriesService.getAllCategories().subscribe(
        (response) => {
          this.categoryContainer = response.message
        }
      )
    }


}
