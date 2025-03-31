import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FictionBookAdminService } from '../../services/fiction-book-admin.service';
import { LibraryAdminFictionBookListingContainer } from './library-admin-fiction-book-listing.container';

describe('LibraryAdminFictionBookListingContainer', () => {
  let component: LibraryAdminFictionBookListingContainer;
  let fixture: ComponentFixture<LibraryAdminFictionBookListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminFictionBookListingContainer
      ],
      providers: [
        FictionBookAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminFictionBookListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
