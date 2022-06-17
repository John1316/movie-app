import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/models/category';
import { movies } from 'src/app/models/movies';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  pageName: string = 'Catgeories';
  success: string = '';
  error: string = '';
  delete: string = '';
  categoryContainer: Category[]= [];
  modalRef!: BsModalRef;
  config:any;
  page:any;
  currentPage = 1;

  fullscreed: boolean = false;
  loading: boolean = false;
  loadingAction: boolean = false;
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  constructor(
    private _Title:Title,
    private _CategoriesService:CategoriesService,
    public modalService: BsModalService  ) {
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
      };
     }

  ngOnInit(): void {
    this.showCategories();
    this._Title.setTitle(`Task | Catgeory`)

  }
  // create movie validation
  createCategory = new FormGroup({
    'name' : new FormControl('', Validators.required),
  })


  // create movie
  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }




  // create movie
  onCreate(createCategory:FormGroup){
      this.loadingAction = true

    this._CategoriesService.createCategory(
      createCategory.value
    ).subscribe(
      (response) =>{
        if(response.status === 'success'){
          this.success = 'Your category posted successfully'
          this.error = ''
          this.delete = ''
          this.showCategories()
          this.modalRef.hide()
          this.loadingAction = false

          this.createCategory.reset();
        }else{

          console.log(response);
        }
      }
    )
  }
  // delete movies
  onDelete(id:number , data:any){
    if(confirm(`Are you sure to delete category with id ${id}`)) {

    this.loadingAction = true
    this._CategoriesService.deleteCategory(id,data ).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.delete = 'Your movie deleted successfully';
          this.error = '';
          this.success = '';
          this.loadingAction = false

          this.showCategories();
        }
      }
    )
    }
  }

    // fetch categories
    showCategories(){
    this.loading = true;
      this._CategoriesService.getAllCategories().subscribe(
        (response) => {
          this.categoryContainer = response.message;
          this.loading = false;

        }
      )
    }


}
