import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessUserService } from '../access-user-service';
import { AccessUserRoles } from './access-user-roles';

describe('AccessUserRoles', () => {
  let component: AccessUserRoles;
  let fixture: ComponentFixture<AccessUserRoles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessUserRoles],
      providers: [
        AccessUserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserRoles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
