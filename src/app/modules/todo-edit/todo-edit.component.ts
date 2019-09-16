/**
 * Este componente se usa en un modal y permite editar un ToDo
 */
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController, Platform } from '@ionic/angular';

import Todo from 'src/app/models/todo.model';
import FilePickerItem from '../../models/file-picker-item.model';
import { TodoEditService } from './todo-edit.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('titleInput', { static: false }) titleInput;

  public isMobile: boolean;
  public todo$: Observable<Todo>;
  private imageFile: FilePickerItem;

  constructor(private platform: Platform, private modalController: ModalController, private todoEditService: TodoEditService) { }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile');
  }

  public onImageSelected(imageFile: FilePickerItem) {
    this.imageFile = imageFile;
  }

  public onDismiss() {
    this.modalController.dismiss();
  }

  /**
   * En este método llamo a this.todoEditService.save para guardar el ToDo
   * @param newTitle nuevo title del ToDo
   */
  public async onSubmit(newTitle: string) {
    this.todo.title = newTitle;
    if (this.imageFile) {
      this.todo.image = this.imageFile.name;
    }

    (await this.todoEditService.save(this.todo, this.imageFile && this.imageFile.uri)).subscribe(
      (response) => {
        this.modalController.dismiss({ todo: response });
      },
      err => {
        // MOSTRAR EL MENSAJE DE OTRA FORMA Y NO CON UN ALERT, SOLAMENTE ESTÁ DE EJEMPLO
        alert('Se produjo un error y no se pudo guardar el ToDo');
      }
    );
  }
}
