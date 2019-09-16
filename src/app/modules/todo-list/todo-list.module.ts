import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RimIonicMenuModule } from 'ngx-rim-ionic-menu';

import { TodoListComponent } from './todo-list.component';

@NgModule({
  declarations: [
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RimIonicMenuModule,
  ],
  exports: [
    TodoListComponent,
  ]
})
export class TodoListModule { }
