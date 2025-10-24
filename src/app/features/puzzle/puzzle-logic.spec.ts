import { TestBed } from '@angular/core/testing';

import { PuzzleLogic } from './puzzle-logic';

describe('PuzzleLogic', () => {
  let service: PuzzleLogic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleLogic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
