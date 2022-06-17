import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './content/auth/login/login.component';
import { RegisterComponent } from './content/auth/register/register.component';
import { MoviesComponent } from './content/movies/movies.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ModalModule } from "ngx-bootstrap/modal";
import { NavbarComponent } from './content/shared/navbar/navbar.component';
import { SidebarComponent } from './content/shared/sidebar/sidebar.component';
import { NotfoundComponent } from './content/shared/notfound/notfound.component';
import { ActionLoaderComponent } from './content/shared/action-loader/action-loader.component';
import { FooterComponent } from './content/shared/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './content/shared/loading/loading.component';
import { MoviesDetailsComponent } from './content/movies-details/movies-details.component';
import { SearchbycategoryComponent } from './content/searchbycategory/searchbycategory.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MoviesComponent,
    NavbarComponent,
    SidebarComponent,
    NotfoundComponent,
    ActionLoaderComponent,
    FooterComponent,
    LoadingComponent,
    MoviesDetailsComponent,
    SearchbycategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
