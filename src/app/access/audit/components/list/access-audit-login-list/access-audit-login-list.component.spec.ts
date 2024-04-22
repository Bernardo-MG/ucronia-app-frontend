import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessAuditLoginListComponent } from './access-audit-login-list.component';

describe('AccessAuditLoginListComponent', () => {
  let component: AccessAuditLoginListComponent;
  let fixture: ComponentFixture<AccessAuditLoginListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessAuditLoginListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessAuditLoginListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
