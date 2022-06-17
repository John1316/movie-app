import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { movies } from 'src/app/models/movies';
import { CategoriesService } from 'src/app/services/categories.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-searchbycategory',
  templateUrl: './searchbycategory.component.html',
  styleUrls: ['./searchbycategory.component.scss']
})
export class SearchbycategoryComponent implements OnInit {
  // decalarations
  pageName:string = 'Search by category';
  fullscreed: boolean = false;
  loading: boolean = false;
  loadingAction: boolean = false;
  currentPage = 1;
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  error: string = '';
  movies:movies[] = [];
  categoryContainer: Category[]= [];
  indexForNumbers!: number;
  movieImage ='https://test-api.storexweb.com/';
  constructor(
    private _CategoriesService:CategoriesService,
    private _ActivatedRoute:ActivatedRoute,
    private _Title:Title
  ) { }

  ngOnInit(): void {
    this.getDetails();
    this.showCategories();
  }
  // fetch all categories
  showCategories(){
    this._CategoriesService.getAllCategories().subscribe(
      (response) => {
        this.categoryContainer = response.message
      }
    )
  }
  // get all movies that related to category
  getDetails(){
        // get the activated number of details in the url to fetch the data

    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];
    this.loading = true;
    this._CategoriesService.getSearchBycategory(this.indexForNumbers).subscribe(
      (response) => {
        this.movies = response.message
        this._Title.setTitle(`Task | ${response.message.name}`)
        this.loading= false
      }
    )
  }

}
