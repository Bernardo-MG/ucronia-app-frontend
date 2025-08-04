import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleListingContainer } from './access-role-list.container';

describe('AccessRoleListingContainer', () => {
  let component: AccessRoleListingContainer;
  let fixture: ComponentFixture<AccessRoleListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessRoleListingContainer
      ],
      providers: [
        AccessRoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
