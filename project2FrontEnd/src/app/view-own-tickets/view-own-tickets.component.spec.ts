import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';

import { ViewOwnTicketsComponent } from './view-own-tickets.component';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { Tickets } from '../_interfaces/Tickets.model';

describe('ViewOwnTicketsComponent', () => {
  let component: ViewOwnTicketsComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ViewOwnTicketsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    component = TestBed.createComponent(ViewOwnTicketsComponent).componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve a list of tickets', () => {
    const mockTickets: Array<Tickets> = [
      {
        id: 1,
        clientId: 123,
        amount: 50.99,
        employeeId: 1,
        submissionDate: new Date('2022-04-01'),
        damageDate: new Date('2022-03-30'),
        description: 'Broken phone screen',
        damagerId: 1,
        justification: 'somethign',
        ticketStatus: 0
      },
      {
        id: 2,
        clientId: 2,
        amount: 75.25,
        employeeId: 456,
        submissionDate: new Date('2022-04-02'),
        damageDate: new Date('2022-04-02'),
        description: 'Lunch meeting with client',
        damagerId: 5,
        justification: 'Does not qualify',
        ticketStatus: 0
      },
      {
        id: 3, clientId: 789, amount: 500.00, employeeId: 9, submissionDate: new Date('2022-04-03'), damageDate: new Date('2022-04-02'), description: 'Scratched rental car door', damagerId: 123, justification: 'Car was parked on the street and another car hit it', ticketStatus: 0
      }
    ];
    component.info.Id = 1;
    component.getOwnTickets();
    const req = httpMock.expectOne('http://localhost:5025/ClientViewTickets/GetAllClaims');
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockTickets);

    expect(component.FoundTickets).toEqual(mockTickets);
    expect(component.FoundTickets.length).toBe(3)
  });
});





