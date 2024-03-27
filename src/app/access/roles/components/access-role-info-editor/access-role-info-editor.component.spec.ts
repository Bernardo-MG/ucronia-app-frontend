import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessRoleAddPermissionComponent } from '../access-role-add-permission/access-role-add-permission.component';
import { AccessRoleFormComponent } from '../access-role-form/access-role-form.component';
import { AccessRoleInfoComponent } from '../access-role-info/access-role-info.component';
import { AccessRolePermissionsComponent } from '../access-role-permissions/access-role-permissions.component';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleInfoEditorComponent } from './access-role-info-editor.component';

describe('AccessRoleInfoEditorComponent', () => {
  let component: AccessRoleInfoEditorComponent;
  let fixture: ComponentFixture<AccessRoleInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        PaginationModule,
        LayoutModule,
        AccessRoleInfoEditorComponent,
        AccessRoleFormComponent,
        AccessRolePermissionsComponent,
        AccessRoleInfoComponent,
        AccessRoleAddPermissionComponent
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
