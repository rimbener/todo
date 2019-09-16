import { TestBed } from '@angular/core/testing';

import { PresentTodoEditModalService } from './present-todo-edit-modal.service';
import { IonicModule } from '@ionic/angular';

describe('PresentTodoEditModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicModule
    ],
    providers: [
      PresentTodoEditModalService
    ]
  }));

  it('should be created', () => {
    const service: PresentTodoEditModalService = TestBed.get(PresentTodoEditModalService);
    expect(service).toBeTruthy();
  });
});
