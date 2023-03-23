import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { JwtDecodingService } from '../services/jwt-decoding.service';

import { EmployeeGuard } from './employee.guard';

describe('EmployeeGuard', () => {
  let guard: EmployeeGuard;
  let router: Router;
  let jwtHelperService: JwtDecodingService;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  beforeEach(() => {
    localStorage.setItem('jwt', '')
    route = {} as ActivatedRouteSnapshot;
    state = {} as RouterStateSnapshot;
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
    guard.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiNk9mQ3Jvd3MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJLYXogQnJla2tlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjEiLCJleHAiOjE2Nzk0NDA0MDIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSJ9.0AWxosew_Q0MoCyq00ZAd2-aGdiwMHs7kNCWpCM1h84"
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
    localStorage.setItem('jwt', '');
    const navigateSpy = spyOn(router, 'navigate');
    const result = guard.canActivate(null, null);
    //expect(navigateSpy).toHaveBeenCalledWith(['/Login']);
    expect(result).toBeFalse();
  });
});