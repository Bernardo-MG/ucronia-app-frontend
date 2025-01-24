import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleCreationContainer } from './access-role-creation.container';

describe('AccessRoleCreationContainer', () => {
  let component: AccessRoleCreationContainer;
  let fixture: ComponentFixture<AccessRoleCreationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessRoleCreationContainer
      ],
      providers: [
        AccessRoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleCreationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
