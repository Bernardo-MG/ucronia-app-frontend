import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { Publisher } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { PublisherCrudService } from '../publisher-crud-service';
import { LibraryPublisherList } from './library-publisher-list';

describe('LibraryPublisherList', () => {
  let component: LibraryPublisherList;
  let fixture: ComponentFixture<LibraryPublisherList>;

  const publisherCrudServiceMock = jasmine.createSpyObj<PublisherCrudService>(
    'PublisherCrudService',
    ['getAll', 'create', 'update', 'delete']
  );

  beforeEach(async () => {

    publisherCrudServiceMock.getAll.and.returnValue(
      of(new Page<Publisher>())
    );

    await TestBed.configureTestingModule({
      imports: [
        LibraryPublisherList
      ],
      providers: [
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: PublisherCrudService, useValue: publisherCrudServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryPublisherList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
