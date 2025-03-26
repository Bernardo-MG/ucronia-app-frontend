import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GameBookAdminService } from '../../services/game-book-admin.service';
import { LibraryAdminBookListingContainer } from './library-admin-game-book-listing.container';

describe('LibraryAdminGameBookListingContainer', () => {
  let component: LibraryAdminBookListingContainer;
  let fixture: ComponentFixture<LibraryAdminBookListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminBookListingContainer
      ],
      providers: [
        GameBookAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
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
