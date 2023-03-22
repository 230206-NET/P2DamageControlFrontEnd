import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ViewAllTicketsComponent } from './view-all-tickets.component';

describe('ViewAllTicketsComponent', () => {
  let component: ViewAllTicketsComponent;
  let fixture: ComponentFixture<ViewAllTicketsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ViewAllTicketsComponent],
      imports: [FormsModule, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ViewAllTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
  it('should request all tickets', () => {
    component.getPendingTickets()
    const req = httpMock.expectOne("http://localhost:5025/EmployeeViewTickets/GetPendingClaims")
    expect(req.request.method).toBe("GET")
  })
});
