import { Injectable } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { TodoEditComponent } from './todo-edit.component';
import Todo from 'src/app/models/todo.model';

@Injectable()
export class PresentTodoEditModalService {
  private isMobile: boolean;

  constructor(private modalController: ModalController, platform: Platform) {
    this.isMobile = platform.is('mobile');
  }

  public async present(todo?: Todo): Promise<Todo> {
    try {
      const modal = await this.modalController.create({
        component: TodoEditComponent,
        componentProps: { todo: todo || {} },
        cssClass: this.isMobile ? '' : 'auto-height'
      });
      await modal.present();
      const data = await modal.onDidDismiss();
      if (data && data.data) {
        return data.data.todo;
      }
    } catch (error) {
      // MOSTRAR EL MENSAJE DE OTRA FORMA Y NO CON UN ALERT, SOLAMENTE ESTÁ DE EJEMPLO
      alert('Se produjo un error y no se pudo mostrar el ToDo');
    }
  }
}
