import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { Author } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { AuthorCrudService } from '../author-crud-service';
import { LibraryAuthorList } from './library-author-list';

describe('LibraryAuthorList', () => {
  let component: LibraryAuthorList;
  let fixture: ComponentFixture<LibraryAuthorList>;

  const authorCrudServiceMock = jasmine.createSpyObj<AuthorCrudService>(
    'AuthorCrudService',
    ['getAll', 'create', 'update', 'delete']
  );

  beforeEach(async () => {

    authorCrudServiceMock.getAll.and.returnValue(
      of(new Page<Author>())
    );

    await TestBed.configureTestingModule({
      imports: [
        LibraryAuthorList
      ],
      providers: [
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: AuthorCrudService, useValue: authorCrudServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAuthorList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
