import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { LibraryAdminBookTypeListingContainer } from './library-admin-book-type-listing.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LibraryAdminBookTypeListingContainer', () => {
  let component: LibraryAdminBookTypeListingContainer;
  let fixture: ComponentFixture<LibraryAdminBookTypeListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LibraryAdminBookTypeListingContainer],
    providers: [
        BookTypeAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
