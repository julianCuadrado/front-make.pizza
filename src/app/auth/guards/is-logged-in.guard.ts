import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn,  CanLoad,  CanLoadFn,  Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanLoad{
  
  constructor(
    private tokenService: TokenService,
    private router: Router
  ){}

  canLoad(): Observable<boolean | UrlTree> {
    return this.tokenService.isLoggedIn$.pipe(
      map((isLoggedIn) => isLoggedIn || this.router.createUrlTree(['/']))
    );
  }
  
}