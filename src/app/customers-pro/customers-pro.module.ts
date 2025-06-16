import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomersProPageRoutingModule } from './customers-pro-routing.module';

import { CustomersProPage } from './customers-pro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomersProPageRoutingModule
  ],
  declarations: [CustomersProPage]
})
export class CustomersProPageModule {}
