import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessUserActivateService } from '../../services/user-activate.service';
import { UserActivationContainer } from './user-activation.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserActivationContainer', () => {
  let component: UserActivationContainer;
  let fixture: ComponentFixture<UserActivationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        UserActivationContainer],
    providers: [
        AccessUserActivateService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
