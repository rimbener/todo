/**
 * En este servicio hacemos el POST o PUT para guardar el ToDo en la API
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import Todo from 'src/app/models/todo.model';

@Injectable()
export class TodoEditService {

  constructor(private http: HttpClient) { }

  /**
   * En este método se arma el FormData con la imagen y el ToDo para enviarlo a la API
   * la imagen se transforma desde DataURL a Blob
   * al ToDo se le hace un JSON.stringify para enviarlo en el campo formData.todo
   * se hace PUT o POST dependiendo de si el ToDo ya existia o no (si tiene id entonces ya existe)
   * @param todo el ToDo a guardar
   * @param image la imagen a guardar
   */
  public async save(todo: Todo, image?: string) {
    const formData = new FormData();
    formData.append('todo', JSON.stringify(todo));

    if (image) {
      const imageBlob = await (await fetch(image)).blob();
      formData.append('image', imageBlob, todo.image);
    }
    if (todo.id) {
      return this.http.put<Todo>(environment.todoAPI, formData);
    } else {
      return this.http.post<Todo>(environment.todoAPI, formData);
    }
  }
}
