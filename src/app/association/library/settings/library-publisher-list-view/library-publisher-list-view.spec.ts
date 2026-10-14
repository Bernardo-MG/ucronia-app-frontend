import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { Publisher } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { PublisherService } from '../publisher-service';
import { LibraryPublisherListView } from './library-publisher-list-view';

describe('LibraryPublisherListView', () => {
  let component: LibraryPublisherListView;
  let fixture: ComponentFixture<LibraryPublisherListView>;

  const publisherCrudServiceMock = jasmine.createSpyObj<PublisherService>(
    'PublisherCrudService',
    ['getAll', 'create', 'update', 'delete']
  );

  beforeEach(async () => {

    publisherCrudServiceMock.getAll.and.returnValue(
      of(new Page<Publisher>())
    );

    await TestBed.configureTestingModule({
      imports: [
        LibraryPublisherListView
      ],
      providers: [
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: PublisherService, useValue: publisherCrudServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryPublisherListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
