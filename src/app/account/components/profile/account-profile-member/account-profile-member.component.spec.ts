import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileMemberComponent } from './account-profile-member.component';

describe('AccountProfileMemberComponent', () => {
  let component: AccountProfileMemberComponent;
  let fixture: ComponentFixture<AccountProfileMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfileMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountProfileMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
