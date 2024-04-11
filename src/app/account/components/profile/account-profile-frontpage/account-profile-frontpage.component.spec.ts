import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileFrontpageComponent } from './account-profile-frontpage.component';

describe('AccountProfileFrontpageComponent', () => {
  let component: AccountProfileFrontpageComponent;
  let fixture: ComponentFixture<AccountProfileFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfileFrontpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountProfileFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
