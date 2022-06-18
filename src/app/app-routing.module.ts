import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './content/auth/login/login.component';
import { RegisterComponent } from './content/auth/register/register.component';
import { MoviesDetailsComponent } from './content/pages/movies-details/movies-details.component';
import { MoviesComponent } from './content/pages/movies/movies.component';
import { CategoryComponent } from './content/pages/category/category.component';
import { EditCategoryComponent } from './content/pages/category/edit-category/edit-category.component';
import { NotfoundComponent } from './content/shared/notfound/notfound.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', redirectTo:'movies' ,pathMatch:'full'},
  {path: 'movies', canActivate:[AuthGuard] , component: MoviesComponent},
  {path: 'movie/:id', canActivate:[AuthGuard] , component: MoviesDetailsComponent},
  {path: 'categories', canActivate:[AuthGuard] , component: CategoryComponent},
  {path: 'category/:id', canActivate:[AuthGuard] , component: EditCategoryComponent},
  {path: 'login',  component: LoginComponent},
  {path: 'register',  component: RegisterComponent},
  {path: '**',  component: NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
