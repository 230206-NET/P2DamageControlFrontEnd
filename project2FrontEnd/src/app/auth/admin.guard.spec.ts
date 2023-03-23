import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminGuard } from './admin.guard';
import { JwtDecodingService } from '../services/jwt-decoding.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { of } from 'rxjs';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let jwtHelperService: JwtDecodingService;
  let router: any;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(() => {
    localStorage.setItem('jwt', '')
    route = {} as ActivatedRouteSnapshot;
    state = {} as RouterStateSnapshot;
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => localStorage.getItem('jwt'),
          },
        })
      ],
      providers: [
        JwtDecodingService,
        JwtHelperService,
        AdminGuard,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    });

    guard = TestBed.inject(AdminGuard);
    jwtHelperService = TestBed.inject(JwtDecodingService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user has access level greater than 2', () => {
    guard.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdEFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiQWRtaW4gVGVzdCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjMiLCJleHAiOjE2Nzk1MTQ2ODYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSJ9.g9erxlSV2BY7f80_rWLcwL0ZQzF2WJOWxThtMutJD9U"
    spyOn(jwtHelperService, 'getAccessLevel').and.returnValue(3);
    localStorage.setItem('jwt', ' "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdEFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiQWRtaW4gVGVzdCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjMiLCJleHAiOjE2Nzk1MTQ2ODYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSJ9.g9erxlSV2BY7f80_rWLcwL0ZQzF2WJOWxThtMutJD9U"');
    expect(guard.canActivate(route, state)).toBe(true);
  });

  it('should navigate to notAuthorized page if user has access level less than or equal to 2', () => {
    spyOn(jwtHelperService, 'getAccessLevel').and.returnValue(2);
    localStorage.setItem('jwt', '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiNk9mQ3Jvd3MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJLYXogQnJla2tlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjEiLCJleHAiOjE2Nzk0NDA0MDIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSJ9.0AWxosew_Q0MoCyq00ZAd2-aGdiwMHs7kNCWpCM1h84"');
    expect(guard.canActivate(route, state)).toBe(false);
  });

  it('should navigate to login page if token is not present', () => {
    localStorage.setItem('jwt', '');
    expect(guard.canActivate(route, state)).toBe(false);
  });
  it('should navigate to login page if token is expired', () => {
    localStorage.setItem('jwt', 'dummy_token');
    expect(guard.canActivate(route, state)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/Login']);
  });

});