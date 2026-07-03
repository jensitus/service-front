import { TestBed } from '@angular/core/testing';

import { TheaterService } from './theater.service';

describe('TheaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TheaterService = TestBed.inject(TheaterService);
    expect(service).toBeTruthy();
  });
});
