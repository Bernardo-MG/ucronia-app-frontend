import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLoginList } from './audit-login-list';

describe('AuditLoginList', () => {
  let component: AuditLoginList;
  let fixture: ComponentFixture<AuditLoginList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditLoginList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditLoginList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
