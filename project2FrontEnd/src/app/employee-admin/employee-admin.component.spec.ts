import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { Employees, UserAccessLevelChange } from './employee-admin.component';
import { EmployeeAdminComponent } from './employee-admin.component';
import { JwtDecodingService } from '../services/jwt-decoding.service';
import { Router } from '@angular/router';

describe('EmployeeAdminComponent', () => {
  let component: EmployeeAdminComponent;
  let fixture: ComponentFixture<EmployeeAdminComponent>;
  let httpMock: HttpTestingController;
  let mockRouter: any;
  const mockAdminGuard = {
    canActivate: () => true
  };
  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    await TestBed.configureTestingModule({
      declarations: [EmployeeAdminComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [JwtDecodingService,
        { provide: Router, useValue: mockRouter },]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAdminComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    const request = httpMock.expectOne('http://localhost:5025/EmployeeAdmin/GetAllUsers')

  });

  it('should get all employees', () => {
    const mockEmployees: Employees[] = [
      { id: 1, username: 'user1', fullName: 'User One', email: 'user1@test.com', accessLevel: 2 },
      { id: 2, username: 'user2', fullName: 'User Two', email: 'user2@test.com', accessLevel: 1 },
      { id: 3, username: 'user3', fullName: 'User Three', email: 'user3@test.com', accessLevel: 1 },
    ];

    spyOn(component, 'retrieveEmployees').and.returnValue(of(mockEmployees));
    component.ngOnInit();
    const request = httpMock.expectOne('http://localhost:5025/EmployeeAdmin/GetAllUsers')
    expect(component.Users).toEqual(mockEmployees);

  });

  it('should change user access level', async () => {
    const mockUpdatedEmployee: UserAccessLevelChange = {
      userId: 1,
      accessLevel: 3,
      adminId: 2,
    };
    const mockResponse: AuthenticatedResponse = {
      token: 'User access level updated',
    };
    component.jwtDecoder = jasmine.createSpyObj('JwtDecodingService', ['getId']);
    (component.jwtDecoder as jasmine.SpyObj<JwtDecodingService>).getId.and.returnValue(2);
    await component.changeAccessLevel(1, 3);
    const request = httpMock.expectOne('http://localhost:5025/EmployeeAdmin/GetAllUsers')

    const req = httpMock.expectOne('http://localhost:5025/EmployeeAdmin/UpdateUserAccessLevel');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUpdatedEmployee);
    req.flush(mockResponse);
    expect(component.router.navigate).toHaveBeenCalledWith(['/AdminScreen']);
  });
});