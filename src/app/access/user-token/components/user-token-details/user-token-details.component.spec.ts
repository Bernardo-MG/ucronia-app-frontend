import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTokenDetailsComponent } from './user-token-details.component';

describe('UserTokenDetailsComponent', () => {
  let component: UserTokenDetailsComponent;
  let fixture: ComponentFixture<UserTokenDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTokenDetailsComponent]
    });
    fixture = TestBed.createComponent(UserTokenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
