import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationContainer } from '@app/core/authentication/services/authentication-container.service';
import { AccountProfileViewComponent } from './account-profile-view.component';

describe('AccountProfileViewComponent', () => {
  let component: AccountProfileViewComponent;
  let fixture: ComponentFixture<AccountProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AccountProfileViewComponent
      ],
      providers: [
        AuthenticationContainer
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
