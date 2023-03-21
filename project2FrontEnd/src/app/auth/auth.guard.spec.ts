import { TestBed } from '@angular/core/testing';
import { JwtModule } from '@auth0/angular-jwt';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [

        JwtModule.forRoot({ // for JwtHelperService
          config: {
            tokenGetter: () => {
              return '';
            }
          }})
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
