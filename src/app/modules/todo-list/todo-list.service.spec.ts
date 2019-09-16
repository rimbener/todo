import { TestBed } from '@angular/core/testing';

import { TodoListService } from './todo-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      TodoListService
    ]
  }));

  it('should be created', () => {
    const service: TodoListService = TestBed.get(TodoListService);
    expect(service).toBeTruthy();
  });
});
