import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LibraryAdminGameBookLendingReturnContainer } from './library-admin-game-book-lending-returning.container';

describe('LibraryAdminGameBookLendingReturnContainer', () => {
  let component: LibraryAdminGameBookLendingReturnContainer;
  let fixture: ComponentFixture<LibraryAdminGameBookLendingReturnContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminGameBookLendingReturnContainer
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminGameBookLendingReturnContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
