import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { BackOfficePageRoutingModule } from './back-office-routing.module';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';
import { FormsModule } from '@angular/forms';
import { ArmarPedidoComponent } from './armar-pedido/armar-pedido.component';
import { ConfirmDirectionComponent } from './confirm-direction/confirm-direction.component';

@NgModule({
  declarations: [BackOfficeLayoutComponent, ArmarPedidoComponent, ConfirmDirectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    BackOfficePageRoutingModule
  ],
  
})
export class BackOfficePageModule {}
