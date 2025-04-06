import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthorAdminService } from '@app/association-admin/library-admin/author/services/author-admin.service';
import { BookTypeAdminService } from '@app/association-admin/library-admin/book-type/services/book-type-admin.service';
import { GameSystemAdminService } from '@app/association-admin/library-admin/game-system/services/game-system-admin.service';
import { PublisherAdminService } from '@app/association-admin/library-admin/publisher/services/publisher-admin.service';
import { GameBookAdminService } from '../../../game-book/services/game-book-admin.service';
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
        GameBookAdminService,
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

    fixture = TestBed.createComponent(LibraryAdminGameBookCreationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
