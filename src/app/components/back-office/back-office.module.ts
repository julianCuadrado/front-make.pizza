import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BackOfficePageRoutingModule } from './back-office-routing.module';

import { BackOfficePage } from './back-office.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BackOfficePageRoutingModule
  ],
  declarations: [BackOfficePage]
})
export class BackOfficePageModule {}
