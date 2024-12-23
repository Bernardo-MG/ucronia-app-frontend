import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { LibraryAdminBookTypeListingContainer } from './library-admin-book-type-listing.container';

describe('LibraryAdminBookTypeListingContainer', () => {
  let component: LibraryAdminBookTypeListingContainer;
  let fixture: ComponentFixture<LibraryAdminBookTypeListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminBookTypeListingContainer
      ],
      providers: [
        BookTypeAdminService
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
