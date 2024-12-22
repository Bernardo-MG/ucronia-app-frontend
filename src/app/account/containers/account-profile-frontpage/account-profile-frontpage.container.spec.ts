import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from '@app/account/services/account.service';
import { AccountProfileFrontpageContainer } from './account-profile-frontpage.container';

describe('AccountProfileFrontpageContainer', () => {
  let component: AccountProfileFrontpageContainer;
  let fixture: ComponentFixture<AccountProfileFrontpageContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AccountProfileFrontpageContainer
      ],
      providers: [
        AccountService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountProfileFrontpageContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
