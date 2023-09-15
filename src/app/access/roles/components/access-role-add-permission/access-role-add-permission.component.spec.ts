import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleAddPermissionComponent } from './access-role-add-permission.component';

describe('AccessRoleAddPermissionComponent', () => {
  let component: AccessRoleAddPermissionComponent;
  let fixture: ComponentFixture<AccessRoleAddPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        HttpClientTestingModule,
        LayoutModule
      ],
      declarations: [
        AccessRoleAddPermissionComponent
      ],
      providers:[
        AccessRoleService
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
