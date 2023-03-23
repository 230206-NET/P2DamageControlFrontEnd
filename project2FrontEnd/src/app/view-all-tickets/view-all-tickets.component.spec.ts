import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ViewAllTicketsComponent } from './view-all-tickets.component';

describe('ViewAllTicketsComponent', () => {
  let component: ViewAllTicketsComponent;
  let fixture: ComponentFixture<ViewAllTicketsComponent>;
  let httpMock: HttpTestingController;
  let mockRouter: any;
  const mockEmployeeGuard = {
    canActivate: () => true
  };

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    await TestBed.configureTestingModule({
      declarations: [ViewAllTicketsComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: Router, useValue: mockRouter },]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ViewAllTicketsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });
  afterEach(() => {
    httpMock.verify();
  });
  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    component = TestBed.createComponent(ViewAllTicketsComponent).componentInstance;
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const req = httpMock.expectOne("http://localhost:5025/EmployeeViewTickets/GetPendingClaims")

  });
  //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiNk9mQ3Jvd3MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJLYXogQnJla2tlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjEiLCJleHAiOjE2Nzk0NDA0MDIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSJ9.0AWxosew_Q0MoCyq00ZAd2-aGdiwMHs7kNCWpCM1h84"
  it('should request all tickets', () => {
    component.getPendingTickets()
    const req = httpMock.expectOne("http://localhost:5025/EmployeeViewTickets/GetPendingClaims")
    expect(req.request.method).toBe("GET")
  })
  it('should rule on ticket', () => {
    component.info = 1
    component.approveTicket(1, 1)
    httpMock.expectOne("http://localhost:5025/EmployeeViewTickets/GetPendingClaims")
    const req = httpMock.expectOne("http://localhost:5025/EmployeeViewTickets/UpdateTicketStatus")

  })
});
