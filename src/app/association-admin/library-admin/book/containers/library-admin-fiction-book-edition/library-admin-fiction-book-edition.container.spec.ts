import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { AuthorAdminService } from '@app/association-admin/library-admin/author/services/author-admin.service';
import { BookTypeAdminService } from '@app/association-admin/library-admin/book-type/services/book-type-admin.service';
import { GameSystemAdminService } from '@app/association-admin/library-admin/game-system/services/game-system-admin.service';
import { PublisherAdminService } from '@app/association-admin/library-admin/publisher/services/publisher-admin.service';
import { BookAdminService } from '../../services/book-admin.service';
import { LibraryAdminFictionBookEditionContainer } from './library-admin-fiction-book-edition.container';

describe('LibraryAdminFictionBookEditionContainer', () => {
  let component: LibraryAdminFictionBookEditionContainer;
  let fixture: ComponentFixture<LibraryAdminFictionBookEditionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminFictionBookEditionContainer
      ],
      providers: [
        BookAdminService,
        BookTypeAdminService,
        GameSystemAdminService,
        AuthorAdminService,
        PublisherAdminService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminFictionBookEditionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
