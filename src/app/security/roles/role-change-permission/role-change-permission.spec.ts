import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RoleService } from '../role-service';
import { RoleChangePermission } from './role-change-permission';

describe('RoleChangePermission', () => {
  let component: RoleChangePermission;
  let fixture: ComponentFixture<RoleChangePermission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RoleChangePermission
      ],
      providers: [
        RoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoleChangePermission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
