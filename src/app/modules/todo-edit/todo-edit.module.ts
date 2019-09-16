import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FilePickerModule } from '../file-picker/file-picker.module';

import { TodoEditComponent } from './todo-edit.component';
import { TodoEditService } from './todo-edit.service';
import { RimIonicMenuModule } from 'ngx-rim-ionic-menu';
import { PresentTodoEditModalService } from './present-todo-edit-modal.service';
import { TodoEditImageComponent } from './todo-edit-image/todo-edit-image.component';

@NgModule({
  declarations: [
    TodoEditComponent,
    TodoEditImageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RimIonicMenuModule,
    FilePickerModule
  ],
  entryComponents: [
    TodoEditComponent
  ],
  providers: [
    TodoEditService,
    PresentTodoEditModalService
  ]
})
export class TodoEditModule { }
