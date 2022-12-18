import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSideMenuOptionsComponent } from './account-side-menu-options.component';

describe('AccountSideMenuOptionsComponent', () => {
  let component: AccountSideMenuOptionsComponent;
  let fixture: ComponentFixture<AccountSideMenuOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSideMenuOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSideMenuOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
