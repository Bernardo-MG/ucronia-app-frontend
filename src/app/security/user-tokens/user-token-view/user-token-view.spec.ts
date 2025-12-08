import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserTokenView } from './user-token-view';

describe('UserTokenView', () => {
  let component: UserTokenView;
  let fixture: ComponentFixture<UserTokenView>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserTokenView
      ],
      providers: [
        ConfirmationService,
        MessageService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    });
    fixture = TestBed.createComponent(UserTokenView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
