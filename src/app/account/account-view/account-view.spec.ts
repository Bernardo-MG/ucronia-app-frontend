import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from '@app/account/account-service';
import { Account } from '@bernardo-mg/security';
import { Profile } from '@ucronia/domain';
import { of } from 'rxjs';

import { AccountSection, AccountView } from './account-view';

describe('AccountView', () => {
  let component: AccountView;
  let fixture: ComponentFixture<AccountView>;
  let accountServiceMock: jasmine.SpyObj<AccountService>;

  beforeEach(async () => {
    const account = Object.assign(new Account(), {
      username: 'bernardo',
      name: 'Bernardo',
      email: 'bernardo@example.com'
    });

    const profile = new Profile();

    accountServiceMock = jasmine.createSpyObj<AccountService>(
      'AccountService',
      [
        'getAccount',
        'getProfile',
        'changePassword'
      ]
    );

    accountServiceMock.getAccount.and.returnValue(of(account));
    accountServiceMock.getProfile.and.returnValue(of(profile));
    accountServiceMock.changePassword.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [AccountView],
      providers: [
        {
          provide: AccountService,
          useValue: accountServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the account and profile', () => {
    expect(accountServiceMock.getAccount).toHaveBeenCalledTimes(1);
    expect(accountServiceMock.getProfile).toHaveBeenCalledTimes(1);

    expect(component.account.username).toBe('bernardo');
    expect(component.account.name).toBe('Bernardo');
    expect(component.account.email).toBe('bernardo@example.com');
    expect(component.profile).toBeDefined();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Bernardo');
    expect(content).toContain('bernardo@example.com');
  });

  it('should render all account sections', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('#profile')).not.toBeNull();
    expect(element.querySelector('#member')).not.toBeNull();
    expect(element.querySelector('#password')).not.toBeNull();
  });

  it('should use the profile section as the initial active section', () => {
    expect(component.activeSection).toBe(AccountSection.Profile);

    const activeItem: HTMLElement | null =
      fixture.nativeElement.querySelector('.account-nav__item--active');

    expect(activeItem).not.toBeNull();
    expect(activeItem?.textContent).toContain('Cuenta');
  });

  it('should change the active section when the target is not found', () => {
    spyOn(document, 'getElementById').and.returnValue(null);

    component.scrollTo(AccountSection.Member);
    fixture.detectChanges();

    expect(component.activeSection).toBe(AccountSection.Member);
  });

  it('should not scroll when the target is not found', () => {
    spyOn(document, 'getElementById').and.returnValue(null);
    const scrollSpy = spyOn(window, 'scrollTo');

    component.scrollTo(AccountSection.Member);

    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it('should scroll to the selected section', () => {
    const target = fixture.nativeElement.querySelector(
      '#password'
    ) as HTMLElement;

    const expectedTop =
      window.scrollY + target.getBoundingClientRect().top - 96;

    const scrollSpy = spyOn(window, 'scrollTo');

    component.scrollTo(AccountSection.Password);

    expect(component.activeSection).toBe(AccountSection.Password);
    expect(scrollSpy).toHaveBeenCalledTimes(1);

    const [options] = scrollSpy.calls.mostRecent().args as unknown as [
      ScrollToOptions
    ];

    expect(options.behavior).toBe('smooth');
    expect(options.top).toBeCloseTo(expectedTop, 5);
  });

});