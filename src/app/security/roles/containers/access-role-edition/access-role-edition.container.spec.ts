import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessRoleService } from '../../services/access-role.service';
import { AccessRoleInfoEditionContainer } from './access-role-edition.container';

describe('AccessRoleInfoEditionContainer', () => {
  let component: AccessRoleInfoEditionContainer;
  let fixture: ComponentFixture<AccessRoleInfoEditionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessRoleInfoEditionContainer
      ],
      providers: [
        AccessRoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleInfoEditionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
