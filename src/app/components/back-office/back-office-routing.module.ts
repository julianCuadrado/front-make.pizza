import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pedido',
  },
  {
    path: '',
    component: BackOfficeLayoutComponent,
    children: [
      {
        path: 'pedido',
        loadChildren: () => import('./pedido/pedido.module').then( m => m.PedidoPageModule)
      },
      {
        path: 'mis-pedidos',
        loadChildren: () => import('./mis-pedidos/mis-pedidos.module').then( m => m.MisPedidosPageModule)
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackOfficePageRoutingModule {}
