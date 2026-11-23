import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { Author } from '@ucronia/domain';
import { ConfirmationService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { AuthorService } from '../author-service';
import { LibraryAuthorListView } from './library-author-list-view';

describe('LibraryAuthorListView', () => {
  let component: LibraryAuthorListView;
  let fixture: ComponentFixture<LibraryAuthorListView>;

  const authorCrudServiceMock = {
    getAll: vi.fn(
    ).mockName("AuthorCrudService.getAll"),
    create: vi.fn().mockName("AuthorCrudService.create"), update: vi.fn().mockName("AuthorCrudService.update"), delete: vi.fn(
  ).mockName("AuthorCrudService.delete")
};

  beforeEach(async () => {

    authorCrudServiceMock.getAll.mockReturnValue(
      of(new Page<Author>())
    );

    await TestBed.configureTestingModule({
      imports: [
        LibraryAuthorListView
      ],
      providers: [
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
