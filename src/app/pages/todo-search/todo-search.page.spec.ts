import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSearchPage } from './todo-search.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PresentTodoEditModalService } from 'src/app/modules/todo-edit/present-todo-edit-modal.service';
import { IonicModule } from '@ionic/angular';

describe('TodoSearchPage', () => {
  let component: TodoSearchPage;
  let fixture: ComponentFixture<TodoSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        IonicModule,
        HttpClientTestingModule
      ],
      providers: [
        PresentTodoEditModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
