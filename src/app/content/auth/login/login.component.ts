import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error:string = '';
  actionLoader:boolean= false

  constructor(
    private _AuthService:AuthService,
    private _Router:Router,
    private _Title:Title
  ) {
    if (localStorage.getItem('currentUserToken')) {
      this._Router.navigate(['/movies'])
    }
  }
  login = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required),
  })
  ngOnInit(): void {
    this._Title.setTitle(`Task | Login`)

  }
  submit(login:FormGroup){
    this.actionLoader = true
    this._AuthService.login(login.value).subscribe(
      (response) => {
        if (response.status === 'success') {
          localStorage.setItem('currentUserToken', JSON.stringify(response.authorisation.token));
          // sess
          this._AuthService.saveCurrentUserToken();
          this._Router.navigate(['/movies']);
          this.actionLoader = false;
        }
        console.log(response);
      }, error => {
        if (error.status === 401) {

          this.error = error.error.message
          this.actionLoader = false;

        }
        console.log(error);

      }
    )

  }

}
