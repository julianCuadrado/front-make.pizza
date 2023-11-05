import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultadoPagoPageRoutingModule } from './resultado-pago-routing.module';

import { ResultadoPagoPage } from './resultado-pago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultadoPagoPageRoutingModule
  ],
  declarations: [ResultadoPagoPage]
})
export class ResultadoPagoPageModule {}
