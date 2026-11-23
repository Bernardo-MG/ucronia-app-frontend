import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SecurityClient } from '@bernardo-mg/security';
import { UcroniaClient } from '@ucronia/api';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { UserService } from '../user-service';
import { UserView } from './user-view';

describe('UserView', () => {
  let component: UserView;
  let fixture: ComponentFixture<UserView>;

  const securityClientMock = {
    user: {
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

  const ucroniaClientMock = {
    member: {
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
        UserView
      ],
      providers: [
        UserService,
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: SecurityClient, useValue: securityClientMock },
        { provide: UcroniaClient, useValue: ucroniaClientMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
