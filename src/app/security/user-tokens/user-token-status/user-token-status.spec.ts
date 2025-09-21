import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTokenStatus } from './user-token-status';

describe('UserTokenStatus', () => {
  let component: UserTokenStatus;
  let fixture: ComponentFixture<UserTokenStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTokenStatus]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserTokenStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
