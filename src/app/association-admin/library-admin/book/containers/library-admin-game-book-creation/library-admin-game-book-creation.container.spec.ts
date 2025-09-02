import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthorCrudService } from '@app/association-admin/library-admin/author/author-crud-service/author-crud-service';
import { BookTypeCrudService } from '@app/association-admin/library-admin/book-type/book-type-crud-service/book-type-crud-service';
import { GameSystemCrudService } from '@app/association-admin/library-admin/game-system/game-system-crud-service/game-system-crud-service';
import { PublisherCrudService } from '@app/association-admin/library-admin/publisher/publisher-crud-service/publisher-crud-service';
import { LibraryAdminGameBookCreationContainer } from './library-admin-game-book-creation.container';

describe('LibraryAdminGameBookCreationContainer', () => {
  let component: LibraryAdminGameBookCreationContainer;
  let fixture: ComponentFixture<LibraryAdminGameBookCreationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminGameBookCreationContainer
      ],
      providers: [
        BookTypeCrudService,
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

    fixture = TestBed.createComponent(LibraryAdminGameBookCreationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
