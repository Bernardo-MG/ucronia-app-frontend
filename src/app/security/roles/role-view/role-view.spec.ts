import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SecurityClient } from '@bernardo-mg/security';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { RoleService } from '../role-service';
import { RoleView } from './role-view';

describe('RoleView', () => {
  let component: RoleView;
  let fixture: ComponentFixture<RoleView>;

  const securityClientMock = {
    role: {
      create: vi.fn().mockReturnValue(of({})),
      update: vi.fn().mockReturnValue(of({})),
      get: vi.fn().mockReturnValue(of({})),
      delete: vi.fn().mockReturnValue(of({})),
      page: vi.fn().mockReturnValue(of({
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
