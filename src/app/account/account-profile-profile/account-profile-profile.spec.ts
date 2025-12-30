import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountProfileProfile } from './account-profile-profile';

describe('AccountProfileContact', () => {
  let component: AccountProfileProfile;
  let fixture: ComponentFixture<AccountProfileProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfileProfile]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountProfileProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
