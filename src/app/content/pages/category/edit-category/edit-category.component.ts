import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { movies } from 'src/app/models/movies';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
// declarations
success: string = '';
error: string = '';
category!:Category;
loading:boolean = false;
loadingAction: boolean = false;
categoryContainer: Category[]= [];
indexForNumbers!: number;
movieImage ='https://test-api.storexweb.com/';
_method = 'put';
constructor(
  private _CategoriesService:CategoriesService,
  private _ActivatedRoute:ActivatedRoute,
  private _Router:Router,
  private _Title:Title
) { }

ngOnInit(): void {
  this.getDetails();
  this.showCategories();
}
// fetch categories
showCategories(){
  this._CategoriesService.getAllCategories().subscribe(
    (response) => {
      this.categoryContainer = response.message
    }
  )
}
// get categories details
getDetails(){
  // get the activated number of details in the url to fetch the data
  this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];
  this.loading = true;
  this._CategoriesService.getCategorydetails(this.indexForNumbers).subscribe(
    (response) => {
      this.category = response.message
      this._Title.setTitle(`Movies cave | ${response.message.name}`)
      this.loading = false;

    }
  )
}



// update movie validation

updateCategory = new FormGroup({
  'name' : new FormControl('', Validators.required),
  '_method' : new FormControl('', Validators.required)
})


// on update submit
onUpdate(updateCategory:FormGroup){
  this.loadingAction = true;
  this._CategoriesService.updateCategory(
    this.indexForNumbers,
    updateCategory.value
    ).subscribe(
      (response) =>{
      if(response.status === 'success'){
        this.success = 'Your category updated successfully'
        this.error = ''
        this.loadingAction = false;

        setTimeout(() => {
          this._Router.navigate(['/categories']);
        }, 3000);
      }
    }
    , error => {
      this.loadingAction = false;

      console.log(error);
    }
  )
}

}
