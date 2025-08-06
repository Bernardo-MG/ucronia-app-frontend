import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfilePersonComponent } from './account-profile-person.component';

describe('AccountProfilePersonComponent', () => {
  let component: AccountProfilePersonComponent;
  let fixture: ComponentFixture<AccountProfilePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfilePersonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountProfilePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
