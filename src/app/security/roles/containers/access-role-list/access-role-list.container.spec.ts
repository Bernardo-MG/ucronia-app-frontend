import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleListContainer } from './access-role-list.container';

describe('AccessRoleListContainer', () => {
  let component: AccessRoleListContainer;
  let fixture: ComponentFixture<AccessRoleListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessRoleListContainer
      ],
      providers: [
        AccessRoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
