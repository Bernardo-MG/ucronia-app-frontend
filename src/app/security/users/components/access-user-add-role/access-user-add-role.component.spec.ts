import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserAddRoleComponent } from './access-user-add-role.component';

describe('AccessUserAddRoleComponent', () => {
  let component: AccessUserAddRoleComponent;
  let fixture: ComponentFixture<AccessUserAddRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AccessUserAddRoleComponent],
      providers: [
        AccessUserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    fixture = TestBed.createComponent(AccessUserAddRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
