import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleAddPermissionComponent } from './access-role-add-permission.component';

describe('AccessRoleAddPermissionComponent', () => {
  let component: AccessRoleAddPermissionComponent;
  let fixture: ComponentFixture<AccessRoleAddPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
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
