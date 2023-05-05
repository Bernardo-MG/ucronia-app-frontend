import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityContainer } from '@app/core/authentication/services/security-container.service';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccountProfileViewComponent } from './account-profile-view.component';

describe('AccountProfileViewComponent', () => {
  let component: AccountProfileViewComponent;
  let fixture: ComponentFixture<AccountProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutModule
      ],
      declarations: [
        AccountProfileViewComponent
      ],
      providers: [
        SecurityContainer
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
