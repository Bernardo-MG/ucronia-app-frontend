import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountProfileDetails } from './account-profile-details';

describe('AccountProfileDetails', () => {
  let component: AccountProfileDetails;
  let fixture: ComponentFixture<AccountProfileDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfileDetails]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountProfileDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
