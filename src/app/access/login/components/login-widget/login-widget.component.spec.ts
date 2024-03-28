import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../../services/login.service';
import { LoginWidgetComponent } from './login-widget.component';

describe('LoginWidgetComponent', () => {
  let component: LoginWidgetComponent;
  let fixture: ComponentFixture<LoginWidgetComponent>;
  let loginService: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        LoginWidgetComponent
      ],
      providers: [
        LoginService
      ]
    })
      .compileComponents();

    loginService = TestBed.inject(LoginService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
