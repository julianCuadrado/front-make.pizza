import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { BackOfficePageRoutingModule } from './back-office-routing.module';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';
import { FormsModule } from '@angular/forms';
import { ArmarPedidoComponent } from './armar-pedido/armar-pedido.component';
import { SelectDirectionComponent } from './select-direction/select-direction.component';
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  declarations: [BackOfficeLayoutComponent, ArmarPedidoComponent, SelectDirectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    BackOfficePageRoutingModule,
    GoogleMapsModule
  ],
  
})
export class BackOfficePageModule {}
