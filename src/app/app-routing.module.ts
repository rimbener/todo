import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo-unresolved',
    pathMatch: 'full'
  },
  {
    path: 'todo-unresolved', loadChildren: () =>
      import('./pages/todo-unresolved/todo-unresolved.module').then(m => m.TodoUnresolvedPageModule)
  },
  {
    path: 'todo-search', loadChildren: () =>
      import('./pages/todo-search/todo-search.module').then(m => m.TodoSearchPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
