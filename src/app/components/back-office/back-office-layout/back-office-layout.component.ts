import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role } from 'src/app/models/roles.type';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-back-office-layout',
  templateUrl: './back-office-layout.component.html',
  styleUrls: ['./back-office-layout.component.scss'],
})
export class BackOfficeLayoutComponent  implements OnInit {

  currentUser$ = this.tokenService.user$;

  public appPages = [
    { title: 'Pedido', url: '/back-office/pedido', icon: 'mail', roles: ['CUSTOMER'] },
    { title: 'Mis Pedidos', url: '/back-office/mis-pedidos', icon: 'paper-plane', roles: ['CUSTOMER'] },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart', roles: ['ADMINISTRATOR'] },
    { title: 'Archived', url: '/folder/archived', icon: 'archive', roles: ['ADMINISTRATOR'] },
    { title: 'Trash', url: '/folder/trash', icon: 'trash', roles: ['ADMINISTRATOR'] },
    { title: 'Spam', url: '/folder/spam', icon: 'warning', roles: ['ADMINISTRATOR'] },
  ];
  
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
  }

  userRoleIn(allowedRoles: any[]): Observable<boolean> {
    return this.tokenService.user$
    .pipe(
      map((user) => Boolean(user && allowedRoles.includes(user.role)))
    );
  }

  logout() {
    this.tokenService.logout();
  }
}
