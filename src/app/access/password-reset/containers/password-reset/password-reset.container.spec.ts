import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PasswordResetService } from '../../services/password-reset.service';
import { PasswordResetContainer } from './password-reset.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PasswordResetContainer', () => {
  let component: PasswordResetContainer;
  let fixture: ComponentFixture<PasswordResetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        PasswordResetContainer],
    providers: [
        PasswordResetService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(PasswordResetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // **************************************************************************
  // General tests
  // **************************************************************************

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
