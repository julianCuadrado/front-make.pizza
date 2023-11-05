import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasarelaPaypalPage } from './pasarela-paypal.page';

const routes: Routes = [
  {
    path: '',
    component: PasarelaPaypalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasarelaPaypalPageRoutingModule {}
