import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule, Platform } from '@ionic/angular';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { of } from 'rxjs';

import Todo from 'src/app/models/todo.model';
import { TodoUnresolvedPage } from './todo-unresolved.page';
import { TodoUnresolvedService } from './todo-unresolved.service';
import { todoMockBuilder } from 'mocks/builders';
import { PresentTodoEditModalService } from 'src/app/modules/todo-edit/present-todo-edit-modal.service';

class PlatformMobileStub {
  public is(query: string): boolean {
    return true;
  }
}

class PlatformDesktopStub {
  public is(query: string): boolean {
    return false;
  }
}

class PresentTodoEditModalServiceStub {
  public present(todo: Todo) {
    return todo !== undefined ? todo : todoMockBuilder('mock title', true);
  }
}

class TodoUnresolvedServiceStub {
}

describe('TodoUnresolvedPage on Mobile', () => {
  let component: TodoUnresolvedPage;
  let fixture: ComponentFixture<TodoUnresolvedPage>;
  let todoUnresolvedService: TodoUnresolvedService;
  let presentTodoEditModalService: PresentTodoEditModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoUnresolvedPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        IonicModule,
        HttpClientTestingModule,
        Ng2SearchPipeModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: of([]) } },
        { provide: Platform, useClass: PlatformMobileStub },
        { provide: TodoUnresolvedService, useClass: TodoUnresolvedServiceStub },
        { provide: PresentTodoEditModalService, useClass: PresentTodoEditModalServiceStub },
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoUnresolvedPage);
    component = fixture.componentInstance;
    todoUnresolvedService = fixture.debugElement.injector.get(TodoUnresolvedService);
    presentTodoEditModalService = fixture.debugElement.injector.get(PresentTodoEditModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on init isMobile should be true and todoList$ equal to []', () => {
    expect(component.isMobile).toBeTruthy();
    component.todoList$.subscribe(list => expect(list).toEqual([]));
  });

  it('when onStateChange is called, updateList should be called once', () => {
    spyOn(todoUnresolvedService, 'updateList');
    component.onStateChange();
    expect(todoUnresolvedService.updateList).toHaveBeenCalledTimes(1);
  });

  it('when presentEditModal is called, addTodo should be called with the response', fakeAsync(() => {
    const todo = todoMockBuilder('test', false);
    spyOn(todoUnresolvedService, 'addTodo');
    spyOn(presentTodoEditModalService, 'present').and.returnValue(Promise.resolve(todo));
    component.presentEditModal();
    tick();
    expect(todoUnresolvedService.addTodo).toHaveBeenCalledWith(todo);
  }));

  it('when editClick is called, presentEditModal should be called with todo', () => {
    const todo = todoMockBuilder('test', false);
    spyOn(component, 'presentEditModal');
    component.onEditClick(todo);
    expect(component.presentEditModal).toHaveBeenCalledWith(todo);
  });

  it('when addClick is called, presentEditModal should be called', () => {
    spyOn(component, 'presentEditModal');
    component.onAddClick();
    expect(component.presentEditModal).toHaveBeenCalled();
  });

  it('on Mobile ion-searchbar should be not null in rim-header-menu and null in ion-content', () => {
    const header = fixture.debugElement.nativeElement.querySelector('rim-header-menu');
    const searchBarInHeader = header.querySelector('ion-searchbar');
    expect(searchBarInHeader).not.toBeNull();
    const content = fixture.debugElement.nativeElement.querySelector('ion-content');
    const searchBarInContent = content.querySelector('ion-searchbar');
    expect(searchBarInContent).toBeNull();
  });

  it('on app-main-fab-button click, presentEditModal should be called', () => {
    spyOn(component, 'presentEditModal');
    const addButton = fixture.debugElement.nativeElement.querySelector('app-main-fab-button');
    addButton.click();
    expect(component.presentEditModal).toHaveBeenCalled();
  });
});

describe('TodoUnresolvedPage on Desktop', () => {
  let component: TodoUnresolvedPage;
  let fixture: ComponentFixture<TodoUnresolvedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoUnresolvedPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        IonicModule,
        HttpClientTestingModule,
        Ng2SearchPipeModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: of([]) } },
        { provide: Platform, useClass: PlatformDesktopStub },
        { provide: TodoUnresolvedService, useClass: TodoUnresolvedServiceStub },
        { provide: PresentTodoEditModalService, useClass: PresentTodoEditModalServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoUnresolvedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on init isMobile should be false and todoList$ equal to []', () => {
    expect(component.isMobile).toBeFalsy();
    component.todoList$.subscribe(list => expect(list).toEqual([]));
  });

  it('on Desktop ion-searchbar should be null in rim-header-menu and not null in ion-content', () => {
    const header = fixture.debugElement.nativeElement.querySelector('rim-header-menu');
    const searchBarInHeader = header.querySelector('ion-searchbar');
    expect(searchBarInHeader).toBeNull();
    const content = fixture.debugElement.nativeElement.querySelector('ion-content');
    const searchBarInContent = content.querySelector('ion-searchbar');
    expect(searchBarInContent).not.toBeNull();
  });

  it('on app-main-fab-button click, presentEditModal should be called', () => {
    spyOn(component, 'presentEditModal');
    const addButton = fixture.debugElement.nativeElement.querySelector('app-main-fab-button');
    addButton.click();
    expect(component.presentEditModal).toHaveBeenCalled();
  });
});
