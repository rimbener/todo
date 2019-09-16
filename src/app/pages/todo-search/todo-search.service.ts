import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import SearchFilter from '../../models/search-filter.model';
import ObservableTodoList from 'src/app/modules/todo-list/abstract-todo-list.service';
import Todo from 'src/app/models/todo.model';

@Injectable()
export class TodoSearchService {
  private params$: Subject<HttpParams>;
  private observableTodoList: ObservableTodoList;

  constructor(http: HttpClient) {
    this.observableTodoList = new ObservableTodoList(http);
    this.params$ = new Subject();
    this.params$.subscribe(params => {
      this.getFromApi(params);
    });
  }

  public getFromApi(params: HttpParams) {
    this.observableTodoList.getFromApi(params).subscribe(list => this.updateList(list));
  }

  public getTodoList$() {
    return this.observableTodoList.getTodoList$();
  }

  public getTodoList() {
    return this.observableTodoList.getTodoList();
  }

  public search(filter: SearchFilter) {
    let params = new HttpParams();
    if (filter.id) {
      params = params.append('id', filter.id.toString());
    }
    if (filter.title) {
      params = params.append('title', filter.title);
    }
    if (!(filter.resolved && filter.unresolved) && !(!filter.resolved && !filter.unresolved)) {
      if (filter.resolved) {
        params = params.append('resolved', 'true');
      } else {
        params = params.append('resolved', 'false');
      }
    }
    this.params$.next(params);
  }

  public updateList(list: Todo[]) {
    this.observableTodoList.nextList(list);
  }
}
