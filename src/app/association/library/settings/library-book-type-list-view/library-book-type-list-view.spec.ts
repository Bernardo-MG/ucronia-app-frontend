import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { BookType } from '@ucronia/domain';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { BookTypeService } from '../book-type-service';
import { LibraryBookTypeListView } from './library-book-type-list-view';

describe('LibraryBookTypeListView', () => {
  let component: LibraryBookTypeListView;
  let fixture: ComponentFixture<LibraryBookTypeListView>;

  const bookTypeCrudServiceMock = {
    getAll: vi.fn(
    ).mockName("BookTypeCrudService.getAll"),
    create: vi.fn().mockName("BookTypeCrudService.create"), update: vi.fn().mockName("BookTypeCrudService.update"), delete: vi.fn(
  ).mockName("BookTypeCrudService.delete")
};

  beforeEach(async () => {

    bookTypeCrudServiceMock.getAll.mockReturnValue(
      of(new Page<BookType>())
    );

    await TestBed.configureTestingModule({
      imports: [
        LibraryBookTypeListView
      ],
      providers: [
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: BookTypeService, useValue: bookTypeCrudServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookTypeListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
