import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Todo from 'src/app/models/todo.model';
import { environment } from 'src/environments/environment';
import FilePickerItem from 'src/app/models/file-picker-item.model';

@Component({
  selector: 'app-todo-edit-image',
  templateUrl: './todo-edit-image.component.html',
  styleUrls: ['./todo-edit-image.component.scss'],
})
export class TodoEditImageComponent implements OnInit {
  @Input() todo: Todo;
  @Output() imageSelected: EventEmitter<FilePickerItem> = new EventEmitter();

  public imageSrc: string;

  constructor() { }

  ngOnInit() {
    if (this.todo && this.todo.image) {
      this.imageSrc = environment.todoAPI + '/images/' + this.todo.id + '/' + this.todo.image;
    }
  }

  public setImage(file: FilePickerItem) {
    this.imageSrc = file.uri;
    this.imageSelected.emit(file);
  }

  public onImageSelected(file: FilePickerItem) {
    this.setImage(file);
  }

  public removeImage() {
    this.setImage(new FilePickerItem(null, null));
  }
}
