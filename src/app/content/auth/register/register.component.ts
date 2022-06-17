import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  success:string = '';
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
  register = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required),
  })
  ngOnInit(): void {
    this._Title.setTitle(`Task | register`)

  }
  // submit form
  submit(register:FormGroup){
              // apply loader

    this.actionLoader = true
    this._AuthService.register(register.value).subscribe(
      (response) => {
        // if status is success
        if (response.status === 'success') {
          //
          this.success = response.message
          setTimeout(() => {
            this._Router.navigate(['/login']);
          }, 2000);
          // disable loader
          this.actionLoader = false;
        }
        // if status is failed

        if (response.status === 'failed') {
          this.error = response.message.email[0];
          this.actionLoader = false;
          // disable loader

        }
      }
    )

  }

}
