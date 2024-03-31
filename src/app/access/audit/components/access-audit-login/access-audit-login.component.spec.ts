import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessAuditLoginComponent } from './access-audit-login.component';

describe('AccessAuditLoginComponent', () => {
  let component: AccessAuditLoginComponent;
  let fixture: ComponentFixture<AccessAuditLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessAuditLoginComponent]
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
