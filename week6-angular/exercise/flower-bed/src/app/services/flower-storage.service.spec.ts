import { TestBed } from '@angular/core/testing';

import { FlowerStorageService } from './flower-storage.service';

describe('FlowerStorageService', () => {
  let service: FlowerStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowerStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
