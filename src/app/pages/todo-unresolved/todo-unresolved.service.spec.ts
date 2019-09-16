import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TodoUnresolvedService } from './todo-unresolved.service';
import { todoArrayMock, todoMockBuilder, todoListGetFromApiStub } from 'mocks/builders';

describe('TodoUnresolvedService', () => {
  let todoUnresolvedService: TodoUnresolvedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TodoUnresolvedService
      ]
    });
    todoUnresolvedService = TestBed.get(TodoUnresolvedService);
  });

  it('should be created', () => {
    const service: TodoUnresolvedService = TestBed.get(TodoUnresolvedService);
    expect(service).toBeTruthy();
  });

  it(`after calling getFromApi, list.length should be 1`, () => {
    // tslint:disable-next-line:no-string-literal
    spyOn(todoUnresolvedService['observableTodoList'], 'getFromApi').and.callFake(todoListGetFromApiStub);
    todoUnresolvedService.getFromApi();
    todoUnresolvedService.getTodoList$().subscribe(list => {
      expect(list.length).toEqual(1);
    });
  });

  it('after adding one todo list should equal mock', () => {
    // tslint:disable-next-line:no-string-literal
    const todoMock = todoMockBuilder('test', false, 'photo.png');
    todoUnresolvedService.addTodo(todoMock);
    todoUnresolvedService.getTodoList$().subscribe(list => {
      expect(list).toEqual([todoMock]);
    });
  });

  it('should filter resolved items', () => {
    todoUnresolvedService.updateList(todoArrayMock);
    expect(todoArrayMock.length).toEqual(3);
    expect(todoUnresolvedService.getTodoList().length).toEqual(1);
  });
});
