import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GameBookAdminService } from '../../services/game-book-admin.service';
import { LibraryAdminGameBookListingContainer } from './library-admin-game-book-listing.container';

describe('LibraryAdminGameBookListingContainer', () => {
  let component: LibraryAdminGameBookListingContainer;
  let fixture: ComponentFixture<LibraryAdminGameBookListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminGameBookListingContainer
      ],
      providers: [
        GameBookAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminGameBookListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
