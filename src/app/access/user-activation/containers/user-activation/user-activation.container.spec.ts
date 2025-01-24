import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessUserActivateService } from '../../services/user-activate.service';
import { UserActivationContainer } from './user-activation.container';

describe('UserActivationContainer', () => {
  let component: UserActivationContainer;
  let fixture: ComponentFixture<UserActivationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserActivationContainer
      ],
      providers: [
        AccessUserActivateService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserActivationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
