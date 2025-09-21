import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessRoleService } from '../access-role-service';
import { AccessRoleInfoEdition } from './access-role-edition';

describe('AccessRoleInfoEdition', () => {
  let component: AccessRoleInfoEdition;
  let fixture: ComponentFixture<AccessRoleInfoEdition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessRoleInfoEdition
      ],
      providers: [
        AccessRoleService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleInfoEdition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
