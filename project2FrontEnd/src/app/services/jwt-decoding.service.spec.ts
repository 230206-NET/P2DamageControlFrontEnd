import { TestBed } from '@angular/core/testing';

import { JwtDecodingService } from './jwt-decoding.service';

describe('JwtDecodingService', () => {
  let service: JwtDecodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtDecodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should decode jwt token', () => {
    
  })
});
