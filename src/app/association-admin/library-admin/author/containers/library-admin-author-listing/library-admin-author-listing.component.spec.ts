import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthorAdminService } from '../../services/author-admin.service';
import { LibraryAdminAuthorListingContainer } from './library-admin-author-listing.component';

describe('LibraryAdminAuthorListingContainer', () => {
  let component: LibraryAdminAuthorListingContainer;
  let fixture: ComponentFixture<LibraryAdminAuthorListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminAuthorListingContainer
      ],
      providers: [
        AuthorAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminAuthorListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
