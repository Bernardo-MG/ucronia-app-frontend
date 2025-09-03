import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { AuthorCrudService } from '@app/association-admin/library-admin/author/author-crud-service/author-crud-service';
import { BookTypeCrudService } from '@app/association-admin/library-admin/book-type/book-type-crud-service/book-type-crud-service';
import { GameSystemCrudService } from '@app/association-admin/library-admin/game-system/game-system-crud-service/game-system-crud-service';
import { PublisherCrudService } from '@app/association-admin/library-admin/publisher/publisher-crud-service/publisher-crud-service';
import { BookAdminService } from '../../services/book-admin.service';
import { LibraryAdminFictionBookEditionContainer } from './library-admin-book-info';

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
        BookTypeCrudService,
        GameSystemCrudService,
        AuthorCrudService,
        PublisherCrudService,
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
