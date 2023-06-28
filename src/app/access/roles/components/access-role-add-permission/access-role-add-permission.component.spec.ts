import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRoleAddPermissionComponent } from './access-role-add-permission.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AccessRoleAddPermissionComponent', () => {
  let component: AccessRoleAddPermissionComponent;
  let fixture: ComponentFixture<AccessRoleAddPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        AccessRoleAddPermissionComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleAddPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
