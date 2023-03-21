import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { JwtDecodingService } from '../services/jwt-decoding.service';
import { EmployeeAdminComponent } from './employee-admin.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmployeeAdminComponent', () => {
  let component: EmployeeAdminComponent;
  let fixture: ComponentFixture<EmployeeAdminComponent>;
  let httpMock : HttpTestingController;
  let injector: TestBed

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAdminComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
    injector = getTestBed()
    fixture = TestBed.createComponent(EmployeeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = injector.get(HttpTestingController)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should retrieve employee list', () => {
    const dummyUsers = [{
      id: 1,
      username: 'testing',
      fullName: 'Test User',
      email: 'test@testing.com',
      accessLevel: 1
    }]
    const req = httpMock.expectOne("http://localhost:5025/EmployeeAdmin/GetAllUsers")
    expect(req.request.method).toBe("GET")
    component.retrieveEmployees()
    req.flush(dummyUsers)
  });
  it('should change access level', () => {
    const dummyUsers = [{
      id: 1,
      username: 'testing',
      fullName: 'Test User',
      email: 'test@testing.com',
      accessLevel: 1
    }]
    //const req = httpMock.expectOne("http://localhost:5025/EmployeeAdmin/UpdateUserAccessLevel")
    //expect(req.request.method).toBe("PUT")
    component.changeAccessLevel(1, 3)
    expect(dummyUsers[0].accessLevel).toBe(3)
    //req.flush(dummyUsers)
  })

});
