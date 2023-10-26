import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { BackOfficePageRoutingModule } from './back-office-routing.module';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';
import { FormsModule } from '@angular/forms';
import { ArmarPedidoComponent } from './armar-pedido/armar-pedido.component';

@NgModule({
  declarations: [BackOfficeLayoutComponent, ArmarPedidoComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    BackOfficePageRoutingModule
  ],
  
})
export class BackOfficePageModule {}
