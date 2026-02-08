import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SecurityClient } from '@bernardo-mg/security';
import { UcroniaClient } from '@ucronia/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { UserService } from '../user-service';
import { UserView } from './user-view';

describe('UserView', () => {
  let component: UserView;
  let fixture: ComponentFixture<UserView>;

  const securityClientMock = {
    user: {
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

  const ucroniaClientMock = {
    memberProfile: {
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
