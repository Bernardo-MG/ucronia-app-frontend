import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountChangePasswordFormComponent } from '@app/account/components/account-change-password-form/account-change-password-form.component';
import { AccountService } from '@app/account/services/account.service';

import { AccountChangePasswordViewComponent } from './account-password-view.component';

describe('AccountChangePasswordViewComponent', () => {
  let component: AccountChangePasswordViewComponent;
  let fixture: ComponentFixture<AccountChangePasswordViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        AccountService
      ],
      declarations: [
        AccountChangePasswordViewComponent,
        AccountChangePasswordFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountChangePasswordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
