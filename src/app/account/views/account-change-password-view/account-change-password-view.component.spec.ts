import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from '@app/account/services/account.service';

import { AccountChangePasswordViewComponent } from './account-change-password-view.component';

describe('AccountChangePasswordViewComponent', () => {
  let component: AccountChangePasswordViewComponent;
  let fixture: ComponentFixture<AccountChangePasswordViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AccountService
      ],
      declarations: [
        AccountChangePasswordViewComponent
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
