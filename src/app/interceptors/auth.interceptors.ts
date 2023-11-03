import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url;
    let rutasSinToken = ['api/v1/customers', 'api/v1/auth/authenticate']
    if(!this.verificarUrlsExcluidas(url, rutasSinToken)) {
        let token = localStorage.getItem(environment.headerToken);
        if(token != null) {
            token = 'Bearer ' + token;
            // Clone the request and set the new header in one step.
            const authReq = req.clone({
              setHeaders: { 'Authorization': token ,
                          'ngrok-skip-browser-warning':  '1'}
            });
            // send the newly created request
            return next.handle(authReq);
        }
    }
    return next.handle(req);
  }

  verificarUrlsExcluidas(url:string, urlsExcluidas: string[]):boolean {
    let index = urlsExcluidas.findIndex((element) => url.includes(element));
    return index !== -1;
  }
}