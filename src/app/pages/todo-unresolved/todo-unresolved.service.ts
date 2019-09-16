/**
 * Este servicio extiende ObservableTodoList
 */
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import ObservableTodoList from 'src/app/modules/todo-list/abstract-todo-list.service';
import Todo from '../../models/todo.model';

@Injectable()
export class TodoUnresolvedService {
  private observableTodoList: ObservableTodoList;

  constructor(http: HttpClient) {
    this.observableTodoList = new ObservableTodoList(http);
    this.getFromApi();
  }

  public getFromApi() {
    this.observableTodoList.getFromApi(new HttpParams().set('resolved', 'false'))
      .subscribe(list => this.updateList(list));
  }

  public getTodoList$() {
    return this.observableTodoList.getTodoList$();
  }

  public getTodoList() {
    return this.observableTodoList.getTodoList();
  }

  /**
   * Cuando se crea o actualiza un ToDo se ejecuta este método
   * Si es un nuevo ToDo, se agrega a la lista y se hace el nextList para emitir un nuevo array
   * Si es uno existente, viene en null
   * @param newTodo un nuevo ToDo
   */
  public addTodo(newTodo?: Todo) {
    if (newTodo) {
      this.observableTodoList.todoList.value.push(newTodo);
    }
    this.observableTodoList.nextList(this.observableTodoList.getTodoList());
  }

  /**
   * Cuando se cambia el estado de un ToDo se ejecuta este método y se hace el nextList para emitir un nuevo array
   * @param newTodo un nuevo ToDo
   */
  public updateList(list: Todo[]) {
    this.observableTodoList.nextList(list.filter(item => item.resolved === false));
  }
}
