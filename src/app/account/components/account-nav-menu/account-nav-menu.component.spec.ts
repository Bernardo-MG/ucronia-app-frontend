import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNavMenuComponent } from './account-nav-menu.component';

describe('AccountNavMenuComponent', () => {
  let component: AccountNavMenuComponent;
  let fixture: ComponentFixture<AccountNavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountNavMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
