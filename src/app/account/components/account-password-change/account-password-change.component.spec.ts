import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountChangePasswordFormComponent } from '@app/account/components/account-change-password-form/account-change-password-form.component';
import { AccountService } from '@app/account/services/account.service';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccountPasswordChangeComponent } from './account-password-change.component';

describe('AccountPasswordChangeComponent', () => {
  let component: AccountPasswordChangeComponent;
  let fixture: ComponentFixture<AccountPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        LayoutModule
      ],
      providers: [
        AccountService
      ],
      declarations: [
        AccountPasswordChangeComponent,
        AccountChangePasswordFormComponent
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
