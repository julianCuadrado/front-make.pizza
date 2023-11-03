import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisPedidosPageRoutingModule } from './mis-pedidos-routing.module';

import { MisPedidosPage } from './mis-pedidos.page';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisPedidosPageRoutingModule
  ],
  declarations: [MisPedidosPage]
})
export class MisPedidosPageModule {}
