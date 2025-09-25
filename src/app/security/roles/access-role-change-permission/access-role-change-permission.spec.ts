import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessRoleService } from '../access-role-service';
import { AccessRoleChangePermission } from './access-role-change-permission';

describe('AccessRoleChangePermission', () => {
  let component: AccessRoleChangePermission;
  let fixture: ComponentFixture<AccessRoleChangePermission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessRoleChangePermission
      ],
      providers: [
        AccessRoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleChangePermission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
