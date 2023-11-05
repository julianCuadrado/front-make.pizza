import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasarelaPaypalPageRoutingModule } from './pasarela-paypal-routing.module';

import { PasarelaPaypalPage } from './pasarela-paypal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasarelaPaypalPageRoutingModule
  ],
  declarations: [PasarelaPaypalPage]
})
export class PasarelaPaypalPageModule {}
