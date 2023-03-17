import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnTicketsComponent } from './view-own-tickets.component';

describe('ViewOwnTicketsComponent', () => {
  let component: ViewOwnTicketsComponent;
  let fixture: ComponentFixture<ViewOwnTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOwnTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOwnTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
