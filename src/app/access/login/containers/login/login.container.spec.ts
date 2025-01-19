import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../../services/login.service';
import { LoginContainer } from './login.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LoginContainer', () => {
  let component: LoginContainer;
  let fixture: ComponentFixture<LoginContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        LoginContainer],
    providers: [
        LoginService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
