import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccountDropdown } from './account-dropdown';

describe('AccountDropdown', () => {
  let component: AccountDropdown;
  let fixture: ComponentFixture<AccountDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountDropdown
      ],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
