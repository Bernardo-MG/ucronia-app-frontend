import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthorCrudService } from '@app/association-admin/library-admin/author/services/author-crud-service';
import { BookTypeAdminService } from '@app/association-admin/library-admin/book-type/services/book-type-admin.service';
import { GameSystemAdminService } from '@app/association-admin/library-admin/game-system/services/game-system-admin.service';
import { PublisherAdminService } from '@app/association-admin/library-admin/publisher/services/publisher-admin.service';
import { BookAdminService } from '../../services/book-admin.service';
import { LibraryAdminGameBookEditionContainer } from './library-admin-game-book-edition.container';

describe('LibraryAdminGameBookEditionContainer', () => {
  let component: LibraryAdminGameBookEditionContainer;
  let fixture: ComponentFixture<LibraryAdminGameBookEditionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminGameBookEditionContainer
      ],
      providers: [
        BookAdminService,
        BookTypeAdminService,
        GameSystemAdminService,
        AuthorCrudService,
        PublisherAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminGameBookEditionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
