import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private _jwtService : JwtService, private _router: Router) { }

  canActivate() : boolean{
    if(this._jwtService.getToken())
      return true;
    this._router.navigate(['login']);
    return false;
  }

  canActivateChild() : boolean{
    if(this._jwtService.getToken())
      return true;
    this._router.navigate(['login']);
    return false;
  }
}
