import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadoPagoPage } from './resultado-pago.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadoPagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultadoPagoPageRoutingModule {}
