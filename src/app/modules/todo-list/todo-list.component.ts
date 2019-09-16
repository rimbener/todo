import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import Todo from '../../models/todo.model';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoListService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  @Input() todoList: Todo[];
  @Output() stateChange = new EventEmitter();
  @Output() editClick: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoListService: TodoListService) { }

  public onStateChange(item: Todo, newState: boolean) {
    item.resolved = newState;
    this.todoListService.changeState(item).subscribe(() => {
      this.stateChange.emit();
    });
  }

  public edit(todo: Todo) {
    this.editClick.emit(todo);
  }
}
