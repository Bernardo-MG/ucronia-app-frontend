import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessRoleService } from '../access-role-service';
import { AccessRoleInfo } from './access-role-info';

describe('AccessRoleInfo', () => {
  let component: AccessRoleInfo;
  let fixture: ComponentFixture<AccessRoleInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessRoleInfo
      ],
      providers: [
        AccessRoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
