import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChangePasswordViewComponent } from './account-change-password-view.component';

describe('AccountChangePasswordViewComponent', () => {
  let component: AccountChangePasswordViewComponent;
  let fixture: ComponentFixture<AccountChangePasswordViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountChangePasswordViewComponent ]
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
