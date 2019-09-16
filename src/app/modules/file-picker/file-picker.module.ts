/**
 * Este modulo tiene el componente file-picker,
 * con el cuál podemos sacar una foto o buscar una imagen local
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FilePickerComponent } from './file-picker.component';

@NgModule({
  declarations: [
    FilePickerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FilePickerComponent
  ]
})
export class FilePickerModule { }
