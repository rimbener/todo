import { TestBed } from '@angular/core/testing';

import { TodoEditService } from './todo-edit.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicModule,
      HttpClientTestingModule
    ],
    providers: [
      TodoEditService
    ]
  }));

  it('should be created', () => {
    const service: TodoEditService = TestBed.get(TodoEditService);
    expect(service).toBeTruthy();
  });
});
