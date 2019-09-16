import { TestBed } from '@angular/core/testing';

import { TodoSearchService } from './todo-search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { todoListGetFromApiStub, todoArrayMock } from 'mocks/builders';
import SearchFilter from 'src/app/models/search-filter.model';

describe('TodoSearchService', () => {
  let todoSearchService: TodoSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TodoSearchService
      ]
    });
    todoSearchService = TestBed.get(TodoSearchService);
  });

  it('should be created', () => {
    const service: TodoSearchService = TestBed.get(TodoSearchService);
    expect(service).toBeTruthy();
  });

  it(`should return todoArrayMock`, () => {
    // tslint:disable-next-line:no-string-literal
    spyOn(todoSearchService['observableTodoList'], 'getFromApi').and.callFake(todoListGetFromApiStub);

    const filter: SearchFilter = {};
    todoSearchService.search(filter);
    todoSearchService.getTodoList$().subscribe(list => {
      expect(list).toEqual(todoArrayMock);
    });
  });

  it(`should return items with title 'test' of todoArrayMock`, () => {
    const title = 'test';
    const filter: SearchFilter = { id: undefined, title };
    // tslint:disable-next-line:no-string-literal
    spyOn(todoSearchService['observableTodoList'], 'getFromApi').and.callFake(todoListGetFromApiStub);
    todoSearchService.search(filter);
    todoSearchService.getTodoList$().subscribe(list => {
      expect(list).toEqual(todoArrayMock.filter(item => item.title === title));
    });
  });

  it(`should return resolved items`, () => {
    const filter: SearchFilter = { resolved: true };
    // tslint:disable-next-line:no-string-literal
    spyOn(todoSearchService['observableTodoList'], 'getFromApi').and.callFake(todoListGetFromApiStub);
    todoSearchService.search(filter);
    todoSearchService.getTodoList$().subscribe(list => {
      expect(list).toEqual(todoArrayMock.filter(item => item.resolved === true));
    });
  });

  it(`should return unresolved items`, () => {
    const filter: SearchFilter = { unresolved: true };
    // tslint:disable-next-line:no-string-literal
    spyOn(todoSearchService['observableTodoList'], 'getFromApi').and.callFake(todoListGetFromApiStub);
    todoSearchService.search(filter);
    todoSearchService.getTodoList$().subscribe(list => {
      expect(list).toEqual(todoArrayMock.filter(item => item.resolved === false));
    });
  });

  it(`should return item with id === 1`, () => {
    const filter: SearchFilter = { id: 1 };
    // tslint:disable-next-line:no-string-literal
    spyOn(todoSearchService['observableTodoList'], 'getFromApi').and.callFake(todoListGetFromApiStub);
    todoSearchService.search(filter);
    expect(todoSearchService.getTodoList()[0].id).toEqual(1);
  });

  it(`should throw error 'test error'`, () => {
    spyOn(todoSearchService, 'getFromApi').and.throwError('test error');
    expect(todoSearchService.getFromApi).toThrowError('test error');
  });

});
