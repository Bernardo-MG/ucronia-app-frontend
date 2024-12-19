import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { LibraryAdminBookTypeListingComponent } from './library-admin-book-type-listing.container';

describe('LibraryAdminBookTypeListingComponent', () => {
  let component: LibraryAdminBookTypeListingComponent;
  let fixture: ComponentFixture<LibraryAdminBookTypeListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminBookTypeListingComponent
      ],
      providers: [
        BookTypeAdminService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookTypeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
