import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import Todo from 'src/app/models/todo.model';
import SearchFilter from '../../models/search-filter.model';
import { TodoSearchService } from './todo-search.service';
import { PresentTodoEditModalService } from 'src/app/modules/todo-edit/present-todo-edit-modal.service';

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.page.html',
  styleUrls: ['./todo-search.page.scss'],
  providers: [TodoSearchService]
})
export class TodoSearchPage implements OnInit {
  public TOPMENU_URL = environment.TOPMENU_URL;

  public mainClass: string;
  public isMobile: boolean;
  public todoList$: Observable<Todo[]>;

  constructor(private platform: Platform, private presentTodoEditService: PresentTodoEditModalService,
    // tslint:disable-next-line:align
    private todoSearchService: TodoSearchService) { }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile');
    this.mainClass = this.isMobile ? 'mainOnMobile' : 'mainOnDesktop';
    this.todoList$ = this.todoSearchService.getTodoList$();
  }

  public onStateChange() {
    this.todoSearchService.updateList(this.todoSearchService.getTodoList());
  }

  private async presentEditModal(originalTodo?: Todo) {
    await this.presentTodoEditService.present(originalTodo);
    this.todoSearchService.updateList(this.todoSearchService.getTodoList());
  }

  public onEditClick(todo: Todo) {
    this.presentEditModal(todo);
  }

  public onSearch(ev: SearchFilter) {
    this.todoSearchService.search(ev);
  }
}
