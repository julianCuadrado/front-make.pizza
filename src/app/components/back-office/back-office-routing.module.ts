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
      },
      {
        path: 'pasarela-paypal',
        loadChildren: () => import('./pasarela-paypal/pasarela-paypal.module').then( m => m.PasarelaPaypalPageModule)
      },
      {
        path: 'resultado-pago',
        loadChildren: () => import('./resultado-pago/resultado-pago.module').then( m => m.ResultadoPagoPageModule)
      },
      {
        path: 'pedidos-pendientes',
        loadChildren: () => import('./pedidos-pendientes/pedidos-pendientes.module').then( m => m.PedidosPendientesPageModule)
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackOfficePageRoutingModule {}
