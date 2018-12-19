import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  title : string = 'Login';
  isResultsLoading : boolean = false;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _snackBar: MatSnackBar, private _jwtService: JwtService, private _router: Router) { }

  ngOnInit() {
    this.createForm();
    this.title = this._router.url === '/signup' ? 'Signup' : 'Login';
  }

  createForm(){
    this.authForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    this.isResultsLoading = true;
    if(this._router.url === '/signup'){
      this._authService.signup(this.authForm.value)
      .subscribe(data => {
        this.isResultsLoading = false;
        this.showSnackBar('Registered! Please Login.');
        this._router.navigate(['login']);
      }, error => {
        this.showSnackBar('Failed to register!', error);
      })
    }else{
      this._authService.login(this.authForm.value)
      .subscribe(data => {
        this.isResultsLoading = false;
        this._jwtService.setToken(data.token);
        this.showSnackBar('Logged IN!');
        this._router.navigate(['dashboard','invoices']);
      }, error => {
        this.showSnackBar('Failed to login!', error);
      })
    }
  }

  showSnackBar(message, error: any = null) {
    this._snackBar.open(message, error ? 'Error' : 'Success', {
      duration: 2000,
    });
  }

}
