import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { of } from 'rxjs';
import { AccessAuditLoginService } from '../access-audit-login-service';
import { AuditView } from './audit-view';

describe('AuditView', () => {
  let component: AuditView;
  let fixture: ComponentFixture<AuditView>;

  const securityClientMock = {
    login: {
      register: {
        page: jasmine.createSpy().and.returnValue(of({
          content: [],
          page: 0,
          size: 10,
          totalElements: 0,
          totalPages: 0
        }))
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditView],
      providers: [
        AccessAuditLoginService,
        { provide: SecurityClient, useValue: securityClientMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuditView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
