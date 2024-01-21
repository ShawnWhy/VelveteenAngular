import { TestBed } from '@angular/core/testing';

import { ChosenItemServiceService } from './chosen-item-service.service';

describe('ChosenItemServiceService', () => {
  let service: ChosenItemServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChosenItemServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
