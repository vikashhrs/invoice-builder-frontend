import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { NoAuthGaurdService } from './services/no-auth-gaurd.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [AuthService, JwtService, HttpInterceptorService, AuthService, NoAuthGaurdService]
})
export class CoreModule { }
