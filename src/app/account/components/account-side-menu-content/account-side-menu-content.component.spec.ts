import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSideMenuComponent } from './account-side-menu-content.component';

describe('AccountSideMenuComponent', () => {
  let component: AccountSideMenuComponent;
  let fixture: ComponentFixture<AccountSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSideMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
