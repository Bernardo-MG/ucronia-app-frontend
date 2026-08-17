import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Page } from '@bernardo-mg/request';
import { BookType, GameSystem } from '@ucronia/domain';
import { of } from 'rxjs';
import { LibraryService } from '../library-service';
import { LibraryBookEditionForm } from './library-book-edition-form';

describe('LibraryBookEditionForm', () => {
  let component: LibraryBookEditionForm;
  let fixture: ComponentFixture<LibraryBookEditionForm>;

  const serviceMock = jasmine.createSpyObj<LibraryService>(
    'LibraryService',
    ['getGameSystems', 'getBookTypes', 'searchAuthors', 'searchPublishers']
  );

  beforeEach(async () => {
    serviceMock.getGameSystems.and.returnValue(of(new Page<GameSystem>()));
    serviceMock.getBookTypes.and.returnValue(of(new Page<BookType>()));
    serviceMock.searchAuthors.and.returnValue(of([]));
    serviceMock.searchPublishers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        LibraryBookEditionForm
      ],
      providers: [
        { provide: LibraryService, useValue: serviceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookEditionForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
