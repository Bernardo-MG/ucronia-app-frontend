import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityRolePrivilegeSelectionComponent } from './security-role-privilege-selection.component';

describe('SecurityRolePrivilegeSelectionComponent', () => {
  let component: SecurityRolePrivilegeSelectionComponent;
  let fixture: ComponentFixture<SecurityRolePrivilegeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityRolePrivilegeSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityRolePrivilegeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
