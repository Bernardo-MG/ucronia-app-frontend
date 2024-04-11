import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from '@app/account/services/account.service';
import { AccountProfileInfoComponent } from './account-profile-info.component';

describe('AccountProfileInfoComponent', () => {
  let component: AccountProfileInfoComponent;
  let fixture: ComponentFixture<AccountProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AccountProfileInfoComponent
      ],
      providers: [
        AccountService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
