import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TodoUnresolvedPage } from './todo-unresolved.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RimIonicMenuModule } from 'ngx-rim-ionic-menu';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoEditModule } from 'src/app/modules/todo-edit/todo-edit.module';
import { TodoListModule } from 'src/app/modules/todo-list/todo-list.module';

const routes: Routes = [
  {
    path: '',
    component: TodoUnresolvedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RimIonicMenuModule,
    Ng2SearchPipeModule,
    SharedModule,
    TodoEditModule,
    TodoListModule,
  ],
  declarations: [TodoUnresolvedPage]
})
export class TodoUnresolvedPageModule {}
