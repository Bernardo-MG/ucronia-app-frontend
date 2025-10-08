import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from '@app/account/services/account-service';
import { AccountProfileFrontpage } from './account-profile-frontpage';

describe('AccountProfileFrontpageContainer', () => {
  let component: AccountProfileFrontpage;
  let fixture: ComponentFixture<AccountProfileFrontpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfileFrontpage],
      providers: [
        AccountService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountProfileFrontpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
