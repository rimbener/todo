/**
 * Componente para sacar una foto o buscar una imagen local
 */
import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import GetPicture from './get-picture-types/get-picture-interface';
import CameraPhoto from './get-picture-types/camera-photo';
import FileImage from './get-picture-types/file-image';
import FilePickerItem from '../../models/file-picker-item.model';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilePickerComponent {
  @Output() imageSelected: EventEmitter<FilePickerItem> = new EventEmitter();
  public showRemove: boolean;

  constructor() { }

  public camera() {
    this.getPicture(new CameraPhoto());
  }

  public gallery() {
    this.getPicture(new FileImage());
  }

  /**
   * Recibe un objeto con la interfaz GetPicture, ejecuta el metodo getPicture del objeto
   * * y si el método devuelve un objeto de tipo FilePickerItem,
   * * entonces emite el evento imageSelected con la imagen elegida
   * @param picturePicker interface GetPicture
   */
  private async getPicture(picturePicker: GetPicture) {
    const image = await picturePicker.getPicture();
    if (image) {
      this.showRemove = true;
      this.imageSelected.emit(image);
    }
  }
}
