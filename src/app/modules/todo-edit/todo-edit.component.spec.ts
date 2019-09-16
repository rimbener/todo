import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEditComponent } from './todo-edit.component';
import { IonicModule } from '@ionic/angular';
import { TodoEditService } from './todo-edit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoEditComponent', () => {
  let component: TodoEditComponent;
  let fixture: ComponentFixture<TodoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        IonicModule,
        HttpClientTestingModule
      ],
      providers: [
        TodoEditService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
