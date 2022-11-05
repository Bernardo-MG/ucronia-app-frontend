import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityUserRoleSelectionComponent } from './security-user-role-selection.component';

describe('SecurityUserRoleSelectionComponent', () => {
  let component: SecurityUserRoleSelectionComponent;
  let fixture: ComponentFixture<SecurityUserRoleSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityUserRoleSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityUserRoleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
