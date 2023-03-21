import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JwtDecodingService } from '../services/jwt-decoding.service';
import { EmployeeAdminComponent } from './employee-admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmployeeAdminComponent', () => {
  let component: EmployeeAdminComponent;
  let fixture: ComponentFixture<EmployeeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAdminComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
