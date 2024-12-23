import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookAdminService } from '../../services/book-admin.service';
import { LibraryAdminBookListingContainer } from './library-admin-book-listing.container';

describe('LibraryAdminBookListingContainer', () => {
  let component: LibraryAdminBookListingContainer;
  let fixture: ComponentFixture<LibraryAdminBookListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminBookListingContainer
      ],
      providers: [
        BookAdminService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
