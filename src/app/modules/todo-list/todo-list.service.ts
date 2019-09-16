import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Todo from 'src/app/models/todo.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TodoListService {

  constructor(private http: HttpClient) { }

  public changeState(todo: Todo) {
    const formData = new FormData();
    formData.append('todo', JSON.stringify(todo));
    return this.http.put<Todo>(environment.todoAPI, formData).pipe(
      catchError(err => {
        alert('Error al cambiar el estado');
        return of();
      })
    );
  }

}
