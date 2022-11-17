import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChangePasswordFormComponent } from './account-change-password-form.component';

describe('AccountChangePasswordFormComponent', () => {
  let component: AccountChangePasswordFormComponent;
  let fixture: ComponentFixture<AccountChangePasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountChangePasswordFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountChangePasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
