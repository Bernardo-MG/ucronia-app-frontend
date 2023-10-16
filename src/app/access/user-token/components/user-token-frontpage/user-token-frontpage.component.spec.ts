import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTokenFrontpageComponent } from './user-token-frontpage.component';

describe('UserTokenFrontpageComponent', () => {
  let component: UserTokenFrontpageComponent;
  let fixture: ComponentFixture<UserTokenFrontpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTokenFrontpageComponent]
    });
    fixture = TestBed.createComponent(UserTokenFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
