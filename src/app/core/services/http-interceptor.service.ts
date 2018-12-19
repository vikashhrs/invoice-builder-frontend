import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-type' : 'application/json',
      'Accept': 'application/json'
    }
    const token = this._jwtService.getToken();
    if(token){
      headersConfig['Authorization'] = `Bearer ${token}`
    }

    const _req = req.clone({setHeaders: headersConfig});
    console.log(token, 'interceptor')
    return next.handle(_req);
  }

  constructor(private _jwtService: JwtService) { }
}
