import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ContactMethod } from '@bernardo-mg/security';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ContactMethodService } from '../contact-method-service';
import { ContactMethodListInnerView } from './contact-method-list-inner-view';

describe('ContactMethodListInnerView', () => {
  let component: ContactMethodListInnerView;
  let fixture: ComponentFixture<ContactMethodListInnerView>;

  const contactMethodServiceMock = jasmine.createSpyObj<ContactMethodService>(
    'ContactMethodService',
    ['getAll', 'create', 'update', 'delete']
  );

  beforeEach(async () => {
    contactMethodServiceMock.getAll.and.returnValue(
      of(new PaginatedResponse<ContactMethod>())
    );

    await TestBed.configureTestingModule({
      imports: [
        ContactMethodListInnerView
      ],
      providers: [
        ConfirmationService,
        MessageService,
        provideAnimationsAsync(),
        { provide: ContactMethodService, useValue: contactMethodServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactMethodListInnerView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
