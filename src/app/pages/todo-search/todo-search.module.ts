import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TodoSearchPage } from './todo-search.page';
import { RimIonicMenuModule } from 'ngx-rim-ionic-menu';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoSearchFilterComponent } from './todo-search-filter/todo-search-filter.component';
import { TodoSearchFormComponent } from './todo-search-filter/todo-search-form/todo-search-form.component';
import { FilterButtonComponent } from './todo-search-filter/filter-button/filter-button.component';
import { TodoEditModule } from 'src/app/modules/todo-edit/todo-edit.module';
import { TodoListModule } from 'src/app/modules/todo-list/todo-list.module';

const routes: Routes = [
  {
    path: '',
    component: TodoSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RimIonicMenuModule,
    SharedModule,
    TodoEditModule,
    TodoListModule
  ],
  declarations: [
    TodoSearchPage,
    TodoSearchFormComponent,
    TodoSearchFilterComponent,
    FilterButtonComponent
  ]
})
export class TodoSearchPageModule {}
