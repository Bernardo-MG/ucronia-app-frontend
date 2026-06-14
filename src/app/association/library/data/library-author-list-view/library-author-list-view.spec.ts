import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { Author } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { AuthorService } from '../author-service';
import { LibraryAuthorListView } from './library-author-list-view';

describe('LibraryAuthorListView', () => {
  let component: LibraryAuthorListView;
  let fixture: ComponentFixture<LibraryAuthorListView>;

  const authorCrudServiceMock = jasmine.createSpyObj<AuthorService>(
    'AuthorCrudService',
    ['getAll', 'create', 'update', 'delete']
  );

  beforeEach(async () => {

    authorCrudServiceMock.getAll.and.returnValue(
      of(new Page<Author>())
    );

    await TestBed.configureTestingModule({
      imports: [
        LibraryAuthorListView
      ],
      providers: [
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: AuthorService, useValue: authorCrudServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAuthorListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
