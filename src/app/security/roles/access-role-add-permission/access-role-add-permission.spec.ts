import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessRoleService } from '../access-role-service';
import { AccessRoleAddPermission } from './access-role-add-permission';

describe('AccessRoleAddPermission', () => {
  let component: AccessRoleAddPermission;
  let fixture: ComponentFixture<AccessRoleAddPermission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessRoleAddPermission],
      providers: [
        AccessRoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleAddPermission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
