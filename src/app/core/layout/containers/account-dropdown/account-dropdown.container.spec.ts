import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccountDropdownContainer } from './account-dropdown.container';

describe('AccountDropdownContainer', () => {
  let component: AccountDropdownContainer;
  let fixture: ComponentFixture<AccountDropdownContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountDropdownContainer
      ],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountDropdownContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
