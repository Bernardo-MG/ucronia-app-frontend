import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { ControlsModule } from '@app/controls/controls.module';
import { DataFormComponent } from '@app/layout/data-form/data-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecurityRoleFormComponent } from '../../components/security-role-form/security-role-form.component';
import { SecurityRolePrivilegeFormComponent } from '../../components/security-role-privilege-form/security-role-privilege-form.component';
import { SecurityRoleService } from '../../service/security-role.service';

import { SecurityRoleEditViewComponent } from './security-role-edit-view.component';

describe('SecurityRoleEditViewComponent', () => {
  let component: SecurityRoleEditViewComponent;
  let fixture: ComponentFixture<SecurityRoleEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ApiUiModule,
        FontAwesomeModule,
        ControlsModule
      ],
      declarations: [
        SecurityRoleEditViewComponent,
        DataFormComponent,
        SecurityRoleFormComponent,
        SecurityRolePrivilegeFormComponent
      ],
      providers: [
        SecurityRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityRoleEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
