import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SecurityClient } from '@bernardo-mg/security';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { RoleService } from '../role-service';
import { RoleView } from './role-view';

describe('RoleView', () => {
  let component: RoleView;
  let fixture: ComponentFixture<RoleView>;

  const securityClientMock = {
    role: {
      create: jasmine.createSpy().and.returnValue(of({})),
      update: jasmine.createSpy().and.returnValue(of({})),
      get: jasmine.createSpy().and.returnValue(of({})),
      delete: jasmine.createSpy().and.returnValue(of({})),
      page: jasmine.createSpy().and.returnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RoleView
      ],
      providers: [
        RoleService,
        ConfirmationService,
        MessageService,
        provideAnimationsAsync(),
        { provide: SecurityClient, useValue: securityClientMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoleView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
