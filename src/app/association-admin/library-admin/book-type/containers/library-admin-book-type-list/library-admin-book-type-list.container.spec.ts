import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { LibraryAdminBookTypeListContainer } from './library-admin-book-type-list.container';

describe('LibraryAdminBookTypeListContainer', () => {
  let component: LibraryAdminBookTypeListContainer;
  let fixture: ComponentFixture<LibraryAdminBookTypeListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminBookTypeListContainer
      ],
      providers: [
        BookTypeAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookTypeListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
