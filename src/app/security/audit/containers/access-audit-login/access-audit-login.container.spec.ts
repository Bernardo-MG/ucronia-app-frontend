import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessAuditLoginService } from '../../services/access-audit-login.service';
import { AccessAuditLoginContainer } from './access-audit-login.container';

describe('AccessAuditLoginContainer', () => {
  let component: AccessAuditLoginContainer;
  let fixture: ComponentFixture<AccessAuditLoginContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AccessAuditLoginContainer
      ],
      providers: [
        AccessAuditLoginService
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
