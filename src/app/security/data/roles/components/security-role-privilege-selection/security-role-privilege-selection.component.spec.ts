import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiUiModule } from '@app/api-ui/api-ui.module';

import { SecurityRolePrivilegeSelectionComponent } from './security-role-privilege-selection.component';

describe('SecurityRolePrivilegeSelectionComponent', () => {
  let component: SecurityRolePrivilegeSelectionComponent;
  let fixture: ComponentFixture<SecurityRolePrivilegeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApiUiModule
      ],
      declarations: [
        SecurityRolePrivilegeSelectionComponent
      ]
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
