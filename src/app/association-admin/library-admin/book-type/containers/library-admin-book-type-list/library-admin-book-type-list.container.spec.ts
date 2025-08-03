import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { LibraryAdminBookTypeListingContainer } from './library-admin-book-type-list.container';

describe('LibraryAdminBookTypeListingContainer', () => {
  let component: LibraryAdminBookTypeListingContainer;
  let fixture: ComponentFixture<LibraryAdminBookTypeListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminBookTypeListingContainer
      ],
      providers: [
        BookTypeAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookTypeListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
