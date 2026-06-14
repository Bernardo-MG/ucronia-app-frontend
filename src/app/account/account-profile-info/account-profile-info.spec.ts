import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountProfileInfo } from './account-profile-info';

describe('AccountProfileInfo', () => {
  let component: AccountProfileInfo;
  let fixture: ComponentFixture<AccountProfileInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfileInfo]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountProfileInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
