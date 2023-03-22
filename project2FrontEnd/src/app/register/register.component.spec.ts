import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ]
    })
      .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send a registration request on valid form submission', () => {
    const form: NgForm = {
      valid: true,
      value: {
        Username: 'testuser',
        Password: 'testpassword',
        Email: 'testuser@test.com',
        FullName: 'Test User'
      }
    } as NgForm;
    component.info = {
      Username: 'testuser',
      Password: 'testpassword',
      Email: 'testuser@test.com',
      FullName: 'Test User'
    }

    component.register(form);

    const req = httpTestingController.expectOne('http://localhost:5025/Register/Register');

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      Username: 'testuser',
      Password: 'testpassword',
      Email: 'testuser@test.com',
      FullName: 'Test User'
    });

    req.flush({ token: 'testtoken' });

    expect(component.invalidReg).toBeFalsy();
  });

  it('should set invalidReg to true on invalid form submission', () => {
    const form: NgForm = {
      valid: false

    } as NgForm;

    component.register(form);

    expect(component.invalidReg).toBeTruthy();
  });
})