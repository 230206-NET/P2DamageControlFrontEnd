import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewProfileInfoComponent } from './view-profile-info.component';
import { JwtDecodingService } from '../services/jwt-decoding.service';
import { Router } from '@angular/router';

describe('ViewProfileInfoComponent', () => {
  let component: ViewProfileInfoComponent;
  let fixture: ComponentFixture<ViewProfileInfoComponent>;
  let httpMock: HttpTestingController;
  let mockRouter: any;
  const mockAuthGuard = {
    canActivate: () => true
  };

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ViewProfileInfoComponent],
      providers: [JwtDecodingService, { provide: Router, useValue: mockRouter }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileInfoComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    httpMock.expectOne('http://localhost:5025/Information/Info')
  });

  it('should do nothing', () => {
    const form = {
      valid: false
    } as any;
    component.profile(form)
    httpMock.expectOne('http://localhost:5025/Information/Info')

    httpMock.expectNone('http://localhost:5025/Information/ChangeInfo')
  })

  it('should update user info on profile', () => {
    component.userInfo.username = 'newuser';
    component.userInfo.email = 'newuser@example.com';
    const form = {
      valid: true,
    } as any;
    component.profile(form);
    const req = httpMock.expectOne('http://localhost:5025/Information/ChangeInfo');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(component.userInfo);
    req.flush({
      token: 'abcdefg',
    });
    expect(component.invalidReg).toBe(false);
    expect(component.router.navigate).toHaveBeenCalledWith(['/afterLogin']);
    httpMock.expectOne('http://localhost:5025/Information/Info')

  });
  it('should retrieve user info on ngOnInit', () => {
    const jwtDecoder = TestBed.inject(JwtDecodingService);
    spyOn(jwtDecoder, 'getId').and.returnValue(1234);
    const req = httpMock.expectOne('http://localhost:5025/Information/Info');
    expect(req.request.method).toEqual('POST');
    req.flush({
      password: '',
      username: 'testuser',
      fullName: 'Test User',
      email: 'testuser@example.com',
      accessLevel: 1,
      id: 1234,
    });
    expect(component.userInfo.username).toEqual('testuser');
  });
})