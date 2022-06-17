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
// declarations
  error:string = '';
  actionLoader:boolean= false

  constructor(
    private _AuthService:AuthService,
    private _Router:Router,
    private _Title:Title
  ) {

  }
  // form validation

  login = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required),
  })
  ngOnInit(): void {
    this._Title.setTitle(`Task | Login`);
    // if he is logined already redirect to movies page
    if (localStorage.getItem('currentUserToken')) {
      this._Router.navigate(['/movies'])
    }
  }
  // submit function
  submit(login:FormGroup){
                            // apply loader

    this.actionLoader = true
    this._AuthService.login(login.value).subscribe(
      (response) => {
        // if response is true then save the currentusertoken()
        if (response.status === 'success') {
          localStorage.setItem('currentUserToken', JSON.stringify(response.authorisation.token));
          // sess
          this._AuthService.saveCurrentUserToken();
          this._Router.navigate(['/movies']);
                        // disable loader

          this.actionLoader = false;
        }
        console.log(response);
      }, error => {
        // if there is an error in login then place the error
        if (error.status === 401) {

          this.error = error.error.message
                                  // disable loader

          this.actionLoader = false;

        }
        console.log(error);

      }
    )

  }

}
