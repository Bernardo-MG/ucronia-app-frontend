import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { ContactMethod } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ContactMethodService } from '../contact-method-service';
import { ContactMethodView } from './contact-method-view';

describe('ContactMethodView', () => {
  let component: ContactMethodView;
  let fixture: ComponentFixture<ContactMethodView>;

  const contactMethodServiceMock = jasmine.createSpyObj<ContactMethodService>(
    'ContactMethodService',
    ['getAll', 'create', 'update', 'delete']
  );

  beforeEach(async () => {
    contactMethodServiceMock.getAll.and.returnValue(
      of(new Page<ContactMethod>())
    );

    await TestBed.configureTestingModule({
      imports: [ContactMethodView],
      providers: [
        ConfirmationService,
        MessageService,
        provideAnimationsAsync(),
        { provide: ContactMethodService, useValue: contactMethodServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactMethodView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
