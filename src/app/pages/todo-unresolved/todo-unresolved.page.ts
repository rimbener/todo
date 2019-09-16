/**
 * Esta página muestra los ToDo pendientes
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';

import { TodoUnresolvedService } from './todo-unresolved.service';
import { PresentTodoEditModalService } from 'src/app/modules/todo-edit/present-todo-edit-modal.service';
import Todo from 'src/app/models/todo.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-unresolved',
  templateUrl: './todo-unresolved.page.html',
  providers: [TodoUnresolvedService]
})
export class TodoUnresolvedPage implements OnInit {
  public TOPMENU_URL = environment.TOPMENU_URL;
  public title: string;
  public isMobile: boolean;
  public todoList$: Observable<Todo[]>;

  constructor(private platform: Platform, private presentTodoEditService: PresentTodoEditModalService,
    // tslint:disable-next-line:align
    private todoUnresolvedService: TodoUnresolvedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile');
    this.todoList$ = this.todoUnresolvedService.getTodoList$();
    /**
     * Esto es para que se actualice desde el servidor cada vez que muestro esta page
     * Porque puede haber cambiado algún ToDo en la página de busqueda
     */
    this.activatedRoute.data.subscribe(() => this.todoUnresolvedService.getFromApi());
  }

  public onStateChange() {
    this.todoUnresolvedService.updateList(this.todoUnresolvedService.getTodoList());
  }

  public async presentEditModal(todo?: Todo) {
    const newTodo = await this.presentTodoEditService.present(todo);
    this.todoUnresolvedService.addTodo(newTodo);
  }

  public onAddClick() {
    this.presentEditModal();
  }

  public onEditClick(todo: Todo) {
    this.presentEditModal(todo);
  }
}
