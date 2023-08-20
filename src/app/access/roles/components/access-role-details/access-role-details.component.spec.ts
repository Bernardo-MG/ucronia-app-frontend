import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessRoleAddPermissionComponent } from '../../components/access-role-add-permission/access-role-add-permission.component';
import { AccessRoleFormComponent } from '../../components/access-role-form/access-role-form.component';
import { AccessRoleInfoComponent } from '../../components/access-role-info/access-role-info.component';
import { AccessRolePermissionsComponent } from '../../components/access-role-permissions/access-role-permissions.component';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleDetailsComponent } from './access-role-details.component';

describe('AccessRoleDetailsComponent', () => {
  let component: AccessRoleDetailsComponent;
  let fixture: ComponentFixture<AccessRoleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FontAwesomeModule,
        PaginationModule,
        CoreModule,
        LayoutModule
      ],
      declarations: [
        AccessRoleDetailsComponent,
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

    fixture = TestBed.createComponent(AccessRoleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
