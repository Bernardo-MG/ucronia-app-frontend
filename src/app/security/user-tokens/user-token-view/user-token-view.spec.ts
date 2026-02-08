import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { UserTokenView } from './user-token-view';

describe('UserTokenView', () => {
  let component: UserTokenView;
  let fixture: ComponentFixture<UserTokenView>;

  const securityClientMock = {
    userToken: {
      patch: jasmine.createSpy().and.returnValue(of({})),
      page: jasmine.createSpy().and.returnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserTokenView
      ],
      providers: [
        ConfirmationService,
        MessageService,
        { provide: SecurityClient, useValue: securityClientMock }
      ]
    });
    fixture = TestBed.createComponent(UserTokenView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
