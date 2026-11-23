import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { Publisher } from '@ucronia/domain';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { PublisherService } from '../publisher-service';
import { LibraryPublisherListView } from './library-publisher-list-view';

describe('LibraryPublisherListView', () => {
  let component: LibraryPublisherListView;
  let fixture: ComponentFixture<LibraryPublisherListView>;

  const publisherCrudServiceMock = {
    getAll: vi.fn(
    ).mockName("PublisherCrudService.getAll"),
    create: vi.fn().mockName("PublisherCrudService.create"), update: vi.fn().mockName("PublisherCrudService.update"), delete: vi.fn(
  ).mockName("PublisherCrudService.delete")
};

  beforeEach(async () => {

    publisherCrudServiceMock.getAll.mockReturnValue(
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
