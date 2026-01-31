import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from '@app/account/account-service';
import { AccountProfileView } from './account-profile-view';

describe('AccountProfileView', () => {
  let component: AccountProfileView;
  let fixture: ComponentFixture<AccountProfileView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfileView],
      providers: [
        AccountService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountProfileView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
