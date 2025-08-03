import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookLendingService } from '../../services/book-lending.service';
import { LibraryAdminLendingListingContainer } from './library-admin-lending-list.container';

describe('LibraryAdminLendingListingContainer', () => {
  let component: LibraryAdminLendingListingContainer;
  let fixture: ComponentFixture<LibraryAdminLendingListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminLendingListingContainer
      ],
      providers: [
        BookLendingService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminLendingListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
