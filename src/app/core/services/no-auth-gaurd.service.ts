import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGaurdService implements CanActivate {

  constructor() { }

  canActivate(){
    return true;
  }
}
