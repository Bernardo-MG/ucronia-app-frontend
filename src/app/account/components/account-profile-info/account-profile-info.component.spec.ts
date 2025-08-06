import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountProfileInfoComponent } from './account-profile-info.component';

describe('AccountProfileInfoComponent', () => {
  let component: AccountProfileInfoComponent;
  let fixture: ComponentFixture<AccountProfileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccountProfileInfoComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
