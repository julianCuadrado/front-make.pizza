import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase: string = '';  

  constructor(public http: HttpClient) { 
    this.urlBase = environment.urlBackend;
  }

  saveUser(user: any): Observable<any> {
    return this.http.post(this.urlBase + 'customers', user);
  }

  authenticate(user: any): Observable<any> {
    return this.http.post(this.urlBase+ 'auth/authenticate', user);
  }
}
