import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { GameBook } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { BookReportService } from '../book-report-service';
import { LibraryLendingService } from '../library-lending-service';
import { LibraryService } from '../library-service';
import { LibraryView } from './library-view';

describe('LibraryView', () => {
  let component: LibraryView;
  let fixture: ComponentFixture<LibraryView>;

  const libraryServiceMock = jasmine.createSpyObj<LibraryService>(
    'LibraryService',
    [
      'getAllGameBooks',
      'getAllFictionBooks',
      'createGameBook',
      'createFictionBook',
      'updateGameBook',
      'updateFictionBook',
      'deleteGameBook',
      'deleteFictionBook',
      'lend',
      'return'
    ]
  );

  const lendingServiceMock = jasmine.createSpyObj<LibraryLendingService>(
    'LibraryLendingService',
    ['getAll']
  );

  const reportServiceMock = jasmine.createSpyObj<BookReportService>(
    'BookReportService',
    ['downloadExcelReport']
  );

  beforeEach(async () => {
    libraryServiceMock.getAllGameBooks.and.returnValue(
      of(new Page<GameBook>())
    );

    await TestBed.configureTestingModule({
      imports: [
        LibraryView
      ],
      providers: [
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: LibraryService, useValue: libraryServiceMock },
        { provide: LibraryLendingService, useValue: lendingServiceMock },
        { provide: BookReportService, useValue: reportServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
