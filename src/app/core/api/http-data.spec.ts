import { TestBed } from '@angular/core/testing';

import { HttpData } from './http-data';

describe('HttpData', () => {
  let service: HttpData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
