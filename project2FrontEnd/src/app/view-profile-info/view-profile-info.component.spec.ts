import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfileInfoComponent } from './view-profile-info.component';

describe('ViewProfileInfoComponent', () => {
  let component: ViewProfileInfoComponent;
  let fixture: ComponentFixture<ViewProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProfileInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
