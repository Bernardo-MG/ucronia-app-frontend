import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleAddPermissionComponent } from '../access-role-add-permission/access-role-add-permission.component';
import { AccessRolePermissionsComponent } from './access-role-permissions.component';

describe('AccessRolePermissionsComponent', () => {
  let component: AccessRolePermissionsComponent;
  let fixture: ComponentFixture<AccessRolePermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PaginationModule,
        LayoutModule
      ],
      declarations: [
        AccessRolePermissionsComponent,
        AccessRoleAddPermissionComponent
      ],
      providers: [
        AccessRoleService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRolePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
