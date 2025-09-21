import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessUserService } from '../access-user-service';
import { AccessUserAddRole } from './access-user-add-role';

describe('AccessUserAddRole', () => {
  let component: AccessUserAddRole;
  let fixture: ComponentFixture<AccessUserAddRole>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AccessUserAddRole],
      providers: [
        AccessUserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    fixture = TestBed.createComponent(AccessUserAddRole);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
