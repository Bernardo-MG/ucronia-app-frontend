import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from '@app/account/services/account.service';
import { AccountProfileFrontpageComponent } from './account-profile-frontpage.component';

describe('AccountProfileFrontpageComponent', () => {
  let component: AccountProfileFrontpageComponent;
  let fixture: ComponentFixture<AccountProfileFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AccountProfileFrontpageComponent
      ],
      providers: [
        AccountService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountProfileFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
