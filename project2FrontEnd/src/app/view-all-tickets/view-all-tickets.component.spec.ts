import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ViewAllTicketsComponent } from './view-all-tickets.component';

describe('ViewAllTicketsComponent', () => {
  let component: ViewAllTicketsComponent;
  let fixture: ComponentFixture<ViewAllTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllTicketsComponent ],
      imports: [ FormsModule, HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
