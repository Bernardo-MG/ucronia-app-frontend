import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@app/core/authentication/services/auth.service';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccountProfileViewComponent } from './account-profile-view.component';

describe('AccountProfileViewComponent', () => {
  let component: AccountProfileViewComponent;
  let fixture: ComponentFixture<AccountProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutModule,
        HttpClientTestingModule
      ],
      declarations: [
        AccountProfileViewComponent
      ],
      providers: [
        AuthService
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
