import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PasswordResetService } from '../../services/password-reset.service';
import { PasswordResetContainer } from './password-reset.container';

describe('PasswordResetContainer', () => {
  let component: PasswordResetContainer;
  let fixture: ComponentFixture<PasswordResetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PasswordResetContainer
      ],
      providers: [
        PasswordResetService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
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
