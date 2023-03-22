import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  let mockRouter: any;
  let httpMock: HttpTestingController;

  const mockAdminGuard = {
    canActivate: () => true
  };

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [{ provide: Router, useValue: mockRouter }]
    })
      .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send a login request on valid form submission', () => {
    const form: NgForm = {
      valid: true,
      value: {
        username: 'testuser',
        password: 'testpassword'
      }
    } as NgForm;
    component.credentials = {
      username: 'testuser',
      password: 'testpassword'
    }

    component.login(form);

    const req = httpTestingController.expectOne('http://localhost:5025/NewLogIn/LogIn');

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      username: 'testuser',
      password: 'testpassword'
    });

    req.flush({ token: 'testtoken' });

    expect(component.invalidLogin).toBeFalsy();
    expect(localStorage.getItem('jwt')).toEqual('testtoken');
  });

  it('should set invalidLogin to true on invalid form submission', async () => {
    const form: NgForm = {
      valid: false
    } as NgForm;

    await component.login(form);
    console.log(localStorage.getItem('jwt'))
    expect(component.invalidLogin).toBeTruthy();
    expect(localStorage.getItem('jwt')).toBeNull();
  });
});