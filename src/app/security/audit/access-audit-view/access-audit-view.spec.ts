import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessAuditLoginService } from '../access-audit-login-service';
import { AccessAuditLogin } from './access-audit-view';

describe('AccessAuditLogin', () => {
  let component: AccessAuditLogin;
  let fixture: ComponentFixture<AccessAuditLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessAuditLogin],
      providers: [
        AccessAuditLoginService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessAuditLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
