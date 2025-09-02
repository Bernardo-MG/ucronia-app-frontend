import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthorCrudService } from '@app/association-admin/library-admin/author/author-crud-service/author-crud-service';
import { BookTypeCrudService } from '@app/association-admin/library-admin/book-type/book-type-crud-service/book-type-crud-service';
import { GameSystemCrudService } from '@app/association-admin/library-admin/game-system/game-system-crud-service/game-system-crud-service';
import { PublisherCrudService } from '@app/association-admin/library-admin/publisher/publisher-crud-service/publisher-crud-service';
import { BookAdminService } from '../../services/book-admin.service';
import { LibraryAdminFictionBookCreationContainer } from './library-admin-fiction-book-creation.container';

describe('LibraryAdminFictionBookCreationContainer', () => {
  let component: LibraryAdminFictionBookCreationContainer;
  let fixture: ComponentFixture<LibraryAdminFictionBookCreationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminFictionBookCreationContainer
      ],
      providers: [
        BookAdminService,
        BookTypeCrudService,
        GameSystemCrudService,
        AuthorCrudService,
        PublisherCrudService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminFictionBookCreationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
