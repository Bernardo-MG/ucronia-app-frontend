import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessRoleService } from '../access-role-service';
import { AccessRoleCreation } from './access-role-creation';

describe('AccessRoleCreationContainer', () => {
  let component: AccessRoleCreation;
  let fixture: ComponentFixture<AccessRoleCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessRoleCreation
      ],
      providers: [
        AccessRoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
