import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class ProductoInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReg = request;
    const token = this.tokenService.getToken();
    if(token != null){
      authReg = authReg.clone(  {headers: request.headers.set('Authorization', 'Bearer' + token)});
    }
    return next.handle(authReg);
  }
}

export const productoInterceptor = [ {provide: HTTP_INTERCEPTORS, useClass: ProductoInterceptor, multi: true}];