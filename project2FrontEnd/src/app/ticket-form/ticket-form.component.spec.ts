import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TicketFormComponent } from './ticket-form.component';
import { Router, RouterModule } from '@angular/router';

describe('TicketFormComponent', () => {
  let component: TicketFormComponent;
  let fixture: ComponentFixture<TicketFormComponent>;
  let mockRouter: any;
  let httpMock: HttpTestingController;
  const mockEmployeeGuard = {
    canActivate: () => true
  };


  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    await TestBed.configureTestingModule({
      declarations: [TicketFormComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule,
        RouterModule.forRoot([])
      ],
      providers: [{ provide: Router, useValue: mockRouter },]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve a damager ID', async () => {
    const damagerName = 'Peter Parker';
    const id = await component.getDamageId(damagerName);
    expect(id).toEqual(1009491);
  });

  it('should display an error message if an invalid damager name is entered', async () => {
    spyOn(window, 'alert');
    const damagerName = 'InvalidDamager';
    try {
      await component.getDamageId(damagerName);
    } catch (err) {
      expect(window.alert).toHaveBeenCalledWith('Not a valid character. Please try again');
    }
  });

  it('should retrieve a list of relevant heroes', async () => {
    component.DamagerName = 'Spider';
    await component.retrieveDamagers();
    const heroList = document.getElementById('possibleheroes') as HTMLSelectElement;
    expect(heroList.options.length).toBeGreaterThan(0);
  });

  it('should submit the claim form', async () => {
    component.DamagerName = 'Peter Parker'
    component.NewClaim = {
      ClientId: 0,
      Amount: 100,
      DamageDate: new Date().toISOString(),
      DamagerId: 0,
      Description: 'Filler'
    }
    component.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiNk9mQ3Jvd3MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJLYXogQnJla2tlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjEiLCJleHAiOjE2Nzk0NDA0MDIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSJ9.0AWxosew_Q0MoCyq00ZAd2-aGdiwMHs7kNCWpCM1h84"
    await component.submitClaim({ valid: true } as any);
    //expect(component.router.navigate).toHaveBeenCalledWith(['/afterLogin']);
  });

});