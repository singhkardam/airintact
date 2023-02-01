import { TestBed } from '@angular/core/testing';

import { ChildrenIdService } from './children-id.service';

describe('ChildrenIdService', () => {
  let service: ChildrenIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildrenIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
