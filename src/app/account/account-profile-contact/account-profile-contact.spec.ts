import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountProfileContact } from './account-profile-contact';

describe('AccountProfileContact', () => {
  let component: AccountProfileContact;
  let fixture: ComponentFixture<AccountProfileContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfileContact]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountProfileContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
