import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthorAdminService } from '@app/association-admin/library-admin/author/services/author-admin.service';
import { BookTypeAdminService } from '@app/association-admin/library-admin/book-type/services/book-type-admin.service';
import { GameSystemAdminService } from '@app/association-admin/library-admin/game-system/services/game-system-admin.service';
import { PublisherAdminService } from '@app/association-admin/library-admin/publisher/services/publisher-admin.service';
import { FictionBookAdminService } from '../../services/fiction-book-admin.service';
import { LibraryAdminFictionBookInfoEditorContainer } from './library-admin-fiction-book-edition.container';

describe('LibraryAdminGameBookInfoEditorContainer', () => {
  let component: LibraryAdminFictionBookInfoEditorContainer;
  let fixture: ComponentFixture<LibraryAdminFictionBookInfoEditorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminFictionBookInfoEditorContainer
      ],
      providers: [
        FictionBookAdminService,
        BookTypeAdminService,
        GameSystemAdminService,
        AuthorAdminService,
        PublisherAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminFictionBookInfoEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
