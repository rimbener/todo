/**
 * Módulo con componentes usados en toda la aplicación
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MainFabButtonComponent } from './main-fab-button/main-fab-button.component';
import { RimIonicMenuModule } from 'ngx-rim-ionic-menu';

@NgModule({
  declarations: [
    MainFabButtonComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RimIonicMenuModule
  ],
  exports: [
    MainFabButtonComponent,
  ]
})
export class SharedModule { }
