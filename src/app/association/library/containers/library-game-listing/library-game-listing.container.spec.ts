import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookService } from '../../services/book.service';
import { LibraryGameListingContainer } from './library-game-listing.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LibraryGameListingContainer', () => {
  let component: LibraryGameListingContainer;
  let fixture: ComponentFixture<LibraryGameListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryGameListingContainer
      ],
      providers: [
        BookService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryGameListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
