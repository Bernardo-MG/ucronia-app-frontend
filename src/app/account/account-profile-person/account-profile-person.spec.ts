import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountProfilePerson } from './account-profile-person';

describe('AccountProfilePersonComponent', () => {
  let component: AccountProfilePerson;
  let fixture: ComponentFixture<AccountProfilePerson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfilePerson]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountProfilePerson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
