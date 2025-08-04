import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookLendingService } from '../../services/book-lending.service';
import { LibraryAdminLendingListContainer } from './library-admin-lending-list.container';

describe('LibraryAdminLendingListContainer', () => {
  let component: LibraryAdminLendingListContainer;
  let fixture: ComponentFixture<LibraryAdminLendingListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminLendingListContainer
      ],
      providers: [
        BookLendingService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminLendingListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
