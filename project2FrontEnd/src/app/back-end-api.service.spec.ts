import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackEndAPIService } from './back-end-api.service';

describe('BackEndAPIService', () => {
  let service: BackEndAPIService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BackEndAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
