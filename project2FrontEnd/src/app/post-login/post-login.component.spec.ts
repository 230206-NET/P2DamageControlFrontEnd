import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLoginComponent } from './post-login.component';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('PostLoginComponent', () => {
  let component: PostLoginComponent;
  let fixture: ComponentFixture<PostLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
