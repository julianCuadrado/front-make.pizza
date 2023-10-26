import { Injectable } from '@angular/core';
import { BehaviorSubject, ignoreElements, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserWithToken } from '../models/user.interface';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private user = new BehaviorSubject<UserWithToken | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  constructor(
    public userService: UserService,
    private router: Router) { 
      this.loadUserFromLocalStorage();
    }

  public obtenerToken(): string {
    return localStorage.getItem(environment.headerToken)!;
  }

  public login(token:string) {
    this.saveTokenToLocalStore(token);
    this.pushNewUser(token);
    this.redirectToDashboard();
    ignoreElements();
  }
/*
  login(credentials: any): Observable<never> {
    return this.userService.authenticate(credentials).pipe(
      tap((userToken) => this.saveTokenToLocalStore(userToken)),
      tap((userToken) => this.pushNewUser(userToken)),
      tap(() => this.redirectToDashboard()),
      ignoreElements()
    );
  }*/

  logout(): void {
    this.removeUserFromLocalStorage();
    this.user.next(null);
    this.router.navigateByUrl('/');
  }

  private redirectToDashboard(): void {
    this.router.navigateByUrl('/back-office');
  }

  private pushNewUser(token: string) {
    this.user.next(this.decodeToken(token.split("\.")[1]));
  }

  private decodeToken(userToken: string): UserWithToken {
    const userInfo = JSON.parse(window.atob(userToken)) as User;
    
    return { ...userInfo, token: userToken };
  }

  private loadUserFromLocalStorage(): void {
    const userFromLocal = localStorage.getItem(environment.headerToken);

    userFromLocal && this.pushNewUser(userFromLocal);
  }
  private saveTokenToLocalStore(userToken: string): void {
    localStorage.setItem(environment.headerToken, userToken);
  }

  private removeUserFromLocalStorage(): void {
    localStorage.removeItem(environment.headerToken);
  }
}
