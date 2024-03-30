import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountChangePasswordFormComponent } from '@app/account/components/account-change-password-form/account-change-password-form.component';
import { AccountService } from '@app/account/services/account.service';
import { AccountPasswordChangeComponent } from './account-password-change.component';

describe('AccountPasswordChangeComponent', () => {
  let component: AccountPasswordChangeComponent;
  let fixture: ComponentFixture<AccountPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AccountPasswordChangeComponent,
        AccountChangePasswordFormComponent
      ],
      providers: [
        AccountService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
