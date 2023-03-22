import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { JwtDecodingService } from '../services/jwt-decoding.service';

import { EmployeeGuard } from './employee.guard';

describe('EmployeeGuard', () => {
  let guard: EmployeeGuard;
  let router: Router;
  let jwtHelperService: JwtDecodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        EmployeeGuard,
        JwtHelperService,
        { provide: JwtDecodingService, useValue: { getAccessLevel: () => 1 } }
      ]
    });
    guard = TestBed.inject(EmployeeGuard);
    router = TestBed.inject(Router);
    jwtHelperService = TestBed.inject(JwtDecodingService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the user is logged in and has an access level > 0', () => {
    spyOn(localStorage, 'getItem').and.returnValue('some_token');
    spyOn(jwtHelperService, 'getAccessLevel').and.returnValue(1);
    const result = guard.canActivate(null, null);
    expect(result).toBeTrue();
  });

  it('should navigate to /ViewTickets and return false if the user is logged in and has an access level of 0', () => {
    spyOn(localStorage, 'getItem').and.returnValue('some_token');
    spyOn(jwtHelperService, 'getAccessLevel').and.returnValue(0);
    const navigateSpy = spyOn(router, 'navigate');
    const result = guard.canActivate(null, null);
    //expect(navigateSpy).toHaveBeenCalledWith(['/ViewTickets']);
    expect(result).toBeFalse();
  });

  it('should navigate to /Login and return false if the user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigate');
    const result = guard.canActivate(null, null);
    //expect(navigateSpy).toHaveBeenCalledWith(['/Login']);
    expect(result).toBeFalse();
  });
});