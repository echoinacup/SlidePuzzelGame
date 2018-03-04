import { TestBed, inject } from '@angular/core/testing';

import { GameOperationsService } from './game-operations.service';

describe('GameOperationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameOperationsService]
    });
  });

  it('should be created', inject([GameOperationsService], (service: GameOperationsService) => {
    expect(service).toBeTruthy();
  }));
});
