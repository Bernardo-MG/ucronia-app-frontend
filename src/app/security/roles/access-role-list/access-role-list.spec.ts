import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccessRoleService } from '../access-role-service';
import { AccessRoleList } from './access-role-list';

describe('AccessRoleList', () => {
  let component: AccessRoleList;
  let fixture: ComponentFixture<AccessRoleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessRoleList
      ],
      providers: [
        AccessRoleService,
        ConfirmationService,
        MessageService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRoleList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
