import { TestBed } from '@angular/core/testing';
import { JwtModule } from '@auth0/angular-jwt';

import { EmployeeGuard } from './employee.guard';

describe('EmployeeGuard', () => {
  let guard: EmployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ JwtModule.forRoot({ // for JwtHelperService
        config: {
          tokenGetter: () => {
            return '';
          }
        }}) ]
    });
    guard = TestBed.inject(EmployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
