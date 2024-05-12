import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessAuditLoginService } from '../../../services/access-audit-login.service';
import { AccessAuditLoginComponent } from './access-audit-login.component';

describe('AccessAuditLoginComponent', () => {
  let component: AccessAuditLoginComponent;
  let fixture: ComponentFixture<AccessAuditLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AccessAuditLoginComponent
      ],
      providers: [
        AccessAuditLoginService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessAuditLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
