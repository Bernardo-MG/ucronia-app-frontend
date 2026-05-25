import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { BookType } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { BookTypeCrudService } from '../book-type-crud-service';
import { LibraryBookTypeListView } from './library-book-type-list-view';

describe('LibraryBookTypeListView', () => {
  let component: LibraryBookTypeListView;
  let fixture: ComponentFixture<LibraryBookTypeListView>;

  const bookTypeCrudServiceMock = jasmine.createSpyObj<BookTypeCrudService>(
    'BookTypeCrudService',
    ['getAll', 'create', 'update', 'delete']
  );

  beforeEach(async () => {

    bookTypeCrudServiceMock.getAll.and.returnValue(
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
        { provide: BookTypeCrudService, useValue: bookTypeCrudServiceMock }
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
