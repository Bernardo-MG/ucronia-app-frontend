import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessAuditLoginService } from '../../services/access-audit-login.service';
import { AccessAuditLoginContainer } from './access-audit-login.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AccessAuditLoginContainer', () => {
  let component: AccessAuditLoginContainer;
  let fixture: ComponentFixture<AccessAuditLoginContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AccessAuditLoginContainer],
    providers: [
        AccessAuditLoginService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessAuditLoginContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
